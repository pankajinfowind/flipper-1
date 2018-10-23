<?php

namespace App\Flipper\Business\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Business\Business;
use Illuminate\Support\Collection;

interface BusinessRepositoryInterface extends BaseRepositoryInterface
{
    public function business(): Business;

    public function createBusiness(array $params) : Business;

    public function findBusinessById(int $id) : Business;

    public function updateBusiness(array $params): bool;

    public function deleteBusiness() : bool;
}
