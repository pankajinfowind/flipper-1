<?php

namespace App\Flipper\Items\Transformations;

use App\Flipper\Items\Items;
use Illuminate\Support\Facades\Storage;

trait ItemTransformable
{
    /**
     * Transform the item
     *
     * @param Item $item
     * @return Item
     */
    protected function transformItem(Item $item)
    {
        $itemRepo = new Item;
        $itemRepo->id = (int) $item->id;
        $itemRepo->barcode = $item->barcode;
        $itemRepo->sku = $item->sku;
        $itemRepo->item = $item->item;
        $itemRepo->units = $item->units;
        $itemRepo->price = $item->price;
        $itemRepo->sale_price = $item->sale_price;
        $itemRepo->cover = $item->cover;
        $itemRepo->category_id = $item->category_id;
        $itemRepo->business_id = $item->business_id;

        return $itemRepo;
    }
}
