<?php

namespace App\Flipper\Items\Repositories\Interfaces;

use App\Flipper\AttributeValues\AttributeValue;
use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Business\Business;
use App\Flipper\ItemAttributes\ItemAttribute;
use App\Flipper\Items\Item;
use Illuminate\Support\Collection;

interface ItemRepositoryInterface extends BaseRepositoryInterface
{
    public function listItems(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection;

    public function createItem(array $data) : Item;

    public function updateItem(array $data) : bool;

    public function findItemById(int $id) : Item;

    public function deleteItem(Item $Item) : bool;

    public function removeItem() : bool;

    public function getCategory() : Collection;

    public function searchItem(string $text) : Collection;

    public function saveItemAttributes(ItemAttribute $ItemAttribute) : ItemAttribute;

    public function listItemAttributes() : Collection;

    public function removeItemAttribute(ItemAttribute $ItemAttribute) : ?bool;

    public function saveCombination(ItemAttribute $ItemAttribute, AttributeValue ...$attributeValues) : Collection;

    public function listCombinations() : Collection;

    public function findItemCombination(ItemAttribute $attribute);

    public function saveBusiness(Business $brand);

    public function findBusiness();
}
