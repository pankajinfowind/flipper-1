<?php

namespace App\Flipper\Stock\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Branch\Branch;
use App\Flipper\Stocks\Stock;
use Illuminate\Support\Collection;

interface StockRepositoryInterface extends BaseRepositoryInterface
{
    public function listStocks(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection;

    public function createStock(array $data) : Stock;

    public function updateStock(array $data) : bool;

    public function findStockById(int $id) : Stock;

    public function deleteStock(Stock $Stock) : bool;

    public function removeStock() : bool;

    public function searchStock(string $text) : Collection;

    public function findBranch():Branch;
}
