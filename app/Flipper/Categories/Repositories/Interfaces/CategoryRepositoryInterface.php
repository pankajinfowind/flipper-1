<?php

namespace App\Flipper\Categories\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Categories\Category;
use App\Flipper\Items\Item;
use Illuminate\Support\Collection;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function listCategories(string $order = 'id', string $sort = 'desc', $except = []) : Collection;

    public function createCategory(array $params) : Category;

    public function updateCategory(array $params) : Category;

    public function findCategoryById(int $id) : Category;

    public function deleteCategory() : bool;

    public function associateItem(Item $Item);

    public function findItems() : Collection;

    public function syncItems(array $params);

    public function detachItems();

}
