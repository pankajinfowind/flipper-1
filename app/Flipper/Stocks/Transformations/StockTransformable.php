<?php

namespace App\Flipper\Stocks\Transformations;

use App\Flipper\Stocks\Stocks;
use Illuminate\Support\Facades\Storage;

trait StockTransformable
{
    /**
     * Transform the Stock
     *
     * @param Stock $Stock
     * @return Stock
     */
    protected function transformStock(Stock $Stock)
    {
        $StockRepo = new Stock;
        $StockRepo->id = (int) $Stock->id;
        $StockRepo->name = $Stock->name;
        $StockRepo->is_new = $Stock->is_new;
        $StockRepo->branch_id = $Stock->branch_id;

        return $StockRepo;
    }
}
