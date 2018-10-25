<?php

namespace App\Flipper\Branch\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Branch\Branch;
use App\Flipper\Branch\Exceptions\BranchNotFoundException;
use App\Flipper\Branch\Repositories\Interfaces\BranchRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BranchRepository extends BaseRepository implements BranchRepositoryInterface
{
    /**
     * BranchRepository constructor.
     *
     * @param Branch $branch
     */
    public function __construct(Branch $branch)
    {
        parent::__construct($branch);
        $this->model = $branch;
    }

    /**
     * List all the Branchs
     *
     * @param string $order
     * @param string $sort
     *
     * @return Collection
     */
    public function branch(): Branch
    {
        return $this->findOneBy(['business_id'=>1]);
    }

    /**
     * Create the Branch
     *
     * @param array $data
     *
     * @return Branch
     */
    public function createBranch(array $data): Branch
    {
        return $this->create($data);
    }

    /**
     * Find the Branch by id
     *
     * @param int $id
     *
     * @return Branch
     */
    public function findBranchById(int $id): Branch
    {
        try {
            return $this->findOneOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new BranchNotFoundException;
        }
    }

    /**
     * Update Branch
     *
     * @param array $params
     *
     * @return bool
     */
    public function updateBranch(array $params): bool
    {

        return $this->update($params);
    }



    /**
     * @return bool
     * @throws \Exception
     */
    public function deleteBranch() : bool
    {
        return $this->delete();
    }
}
