<?php

namespace App\Flipper\Items\Repositories;

use App\Flipper\AttributeValues\AttributeValue;
use App\Flipper\Items\Exceptions\ItemCreateErrorException;
use App\Flipper\Items\Exceptions\ItemUpdateErrorException;
use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Business\Business;
use App\Flipper\ItemAttributes\ItemAttribute;
use App\Flipper\Items\Exceptions\ItemNotFoundException;
use App\Flipper\Items\Item;
use App\Flipper\Items\Repositories\Interfaces\ItemRepositoryInterface;
use App\Flipper\Items\Transformations\ItemTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ItemRepository extends BaseRepository implements ItemRepositoryInterface
{
    use ItemTransformable;

    /**
     * ItemRepository constructor.
     * @param Item $Item
     */
    public function __construct(Item $Item)
    {
        parent::__construct($Item);
        $this->model = $Item;
    }

    /**
     * List all the Items
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return Collection
     */
    public function listItems(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * Create the Item
     *
     * @param array $data
     *
     * @return Item
     * @throws ItemCreateErrorException
     */
    public function createItem(array $data) : Item
    {
        try {
            $this->model->category()->associate($data);
            $this->model->save();
            return $this->model;
        } catch (QueryException $e) {
            throw new ItemCreateErrorException($e);
        }
    }

    /**
     * Update the Item
     *
     * @param array $data
     *
     * @return bool
     * @throws ItemUpdateErrorException
     */
    public function updateItem(array $data) : bool
    {
        try {
            return $this->model->update($data);
        } catch (QueryException $e) {
            throw new ItemUpdateErrorException($e);
        }
    }

    /**
     * Find the Item by ID
     *
     * @param int $id
     *
     * @return Item
     * @throws ItemNotFoundException
     */
    public function findItemById(int $id) : Item
    {
        try {
            return $this->transformItem($this->findOneOrFail($id));
        } catch (ModelNotFoundException $e) {
            throw new ItemNotFoundException($e);
        }
    }

    /**
     * Delete the Item
     *
     * @param Item $Item
     *
     * @return bool
     * @throws \Exception
     * @deprecated
     * @use removeItem
     */
    public function deleteItem(Item $item) : bool
    {
        return $item->delete();
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function removeItem() : bool
    {
        return $this->model->delete();
    }



    /**
     * Return the categories which the Item is associated with
     *
     * @return Collection
     */
    public function getCategory() : Collection
    {
        return $this->model->category()->get();
    }



    /**
     * @param string $text
     * @return mixed
     */
    public function searchItem(string $text) : Collection
    {
        if (!empty($text)) {
            return $this->model->searchItem($text);
        } else {
            return $this->listItems();
        }
    }



    /**
     * Associate the Item attribute to the Item
     *
     * @param ItemAttribute $ItemAttribute
     * @return ItemAttribute
     */
    public function saveItemAttributes(ItemAttribute $ItemAttribute) : ItemAttribute
    {
        $this->model->attributes()->save($ItemAttribute);
        return $ItemAttribute;
    }

    /**
     * List all the Item attributes associated with the Item
     *
     * @return Collection
     */
    public function listItemAttributes() : Collection
    {
        return $this->model->attributes()->get();
    }

    /**
     * Delete the attribute from the Item
     *
     * @param ItemAttribute $ItemAttribute
     *
     * @return bool|null
     * @throws \Exception
     */
    public function removeItemAttribute(ItemAttribute $ItemAttribute) : ?bool
    {
        return $ItemAttribute->delete();
    }

    /**
     * @param ItemAttribute $ItemAttribute
     * @param AttributeValue ...$attributeValues
     *
     * @return Collection
     */
    public function saveCombination(ItemAttribute $ItemAttribute, AttributeValue ...$attributeValues) : Collection
    {
        return collect($attributeValues)->each(function (AttributeValue $value) use ($ItemAttribute) {
            return $ItemAttribute->attributesValues()->save($value);
        });
    }

    /**
     * @return Collection
     */
    public function listCombinations() : Collection
    {
        return $this->model->attributes()->map(function (ItemAttribute $ItemAttribute) {
            return $ItemAttribute->attributesValues;
        });
    }

    /**
     * @param ItemAttribute $itemAttribute
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findItemCombination(ItemAttribute $itemAttribute)
    {
        $values = $itemAttribute->attributesValues()->get();

        return $values->map(function (AttributeValue $attributeValue) {
            return $attributeValue;
        })->keyBy(function (AttributeValue $item) {
            return strtolower($item->attribute->name);
        })->transform(function (AttributeValue $value) {
            return $value->value;
        });
    }

    /**
     * @param Business $business
     */
    public function saveBusiness(Business $business)
    {
        $this->model->business()->associate($business);
    }

    /**
     * @return Business
     */
    public function findBusiness()
    {
        return $this->model->business;
    }
}
