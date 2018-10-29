<?php

namespace App\Flipper\Solds\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Branch\Branch;
use App\Flipper\Solds\Sold;
use Illuminate\Support\Collection;

interface SoldRepositoryInterface extends BaseRepositoryInterface
{
    public function listSolds(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection;

    public function createSold(array $data) : Sold;

    public function updateSold(array $data) : bool;

    public function findSoldById(int $id) : Sold;

    public function deleteSold(Sold $Sold) : bool;

    public function removeSold() : bool;

    public function searchSold(string $text) : Collection;

    public function findBranch():Branch;
}
