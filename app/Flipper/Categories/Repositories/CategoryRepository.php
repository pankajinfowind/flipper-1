<?php

namespace App\Flipper\Categories\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Categories\Category;
use App\Flipper\Categories\Exceptions\CategoryInvalidArgumentException;
use App\Flipper\Categories\Exceptions\CategoryNotFoundException;
use App\Flipper\Categories\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Flipper\Items\Item;
use App\Flipper\Items\Transformations\ItemTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    use  ItemTransformable;

    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        parent::__construct($category);
        $this->model = $category;
    }

    /**
     * List all the categories
     *
     * @param string $order
     * @param string $sort
     * @param array $except
     * @return \Illuminate\Support\Collection
     */
    public function listCategories(string $order = 'id', string $sort = 'desc', $except = []) : Collection
    {
        return $this->model->orderBy($order, $sort)->get()->except($except);
    }

    /**
     * Create the category
     *
     * @param array $params
     *
     * @return Category
     * @throws CategoryInvalidArgumentException
     * @throws CategoryNotFoundException
     */
    public function createCategory(array $params) : Category
    {
        try {

            $category = new Category($params);

            if (isset($params['parent'])) {
                $parent = $this->findCategoryById($params['parent']);
                $category->parent()->associate($parent);
            }

            $category->save();
            return $category;
        } catch (QueryException $e) {
            throw new CategoryInvalidArgumentException($e->getMessage());
        }
    }

    /**
     * Update the category
     *
     * @param array $params
     *
     * @return Category
     * @throws CategoryNotFoundException
     */
    public function updateCategory(array $params) : Category
    {
        $this->model=$this->model->update($params);
        return $this->model;
    }

    /**
     * @param int $id
     * @return Category
     * @throws CategoryNotFoundException
     */
    public function findCategoryById(int $id) : Category
    {
        try {
            return $this->findOneOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new CategoryNotFoundException($e->getMessage());
        }
    }

    /**
     * Delete a category
     *
     * @return bool
     * @throws \Exception
     */
    public function deleteCategory() : bool
    {
        return $this->model->delete();
    }

    /**
     * Associate a item in a category
     *
     * @param Item $item
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function associateItem(Item $item)
    {
        return $this->model->items()->save($item);
    }

    /**
     * Return all the items associated with the category
     *
     * @return mixed
     */
    public function findItems() : Collection
    {
        return $this->model->items;
    }

    /**
     * @param array $params
     */
    public function syncItems(array $params)
    {
        $this->model->items()->sync($params);
    }


    /**
     * Detach the association of the item
     *
     */
    public function detachItems()
    {
        $this->model->items()->detach();
    }



    /**
     * @return mixed
     */
    public function findParentCategory()
    {
        return $this->model->parent;
    }

    /**
     * @return mixed
     */
    public function findChildren()
    {
        return $this->model->children;
    }
}
