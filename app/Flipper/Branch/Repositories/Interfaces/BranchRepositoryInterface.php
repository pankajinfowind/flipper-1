<?php

namespace App\Flipper\Branch\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Branch\Branch;
use Illuminate\Support\Collection;

interface BranchRepositoryInterface extends BaseRepositoryInterface
{
    public function branch(): Branch;

    public function createBranch(array $params) : Branch;

    public function findBranchById(int $id) : Branch;

    public function updateBranch(array $params): bool;

    public function deleteBranch() : bool;
}
