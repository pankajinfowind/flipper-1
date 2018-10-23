<?php

namespace App\Flipper\Business\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Business\Business;
use App\Flipper\Business\Exceptions\BusinessNotFoundException;
use App\Flipper\Business\Repositories\Interfaces\BusinessRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BusinessRepository extends BaseRepository implements BusinessRepositoryInterface
{
    /**
     * BusinessRepository constructor.
     *
     * @param Business $business
     */
    public function __construct(Business $business)
    {
        parent::__construct($business);
        $this->model = $business;
    }

    /**
     * List all the Businesss
     *
     * @param string $order
     * @param string $sort
     *
     * @return Collection
     */
    public function business(): Business
    {
        return $this->findOneBy(['user_id'=>1]);
    }

    /**
     * Create the Business
     *
     * @param array $data
     *
     * @return Business
     */
    public function createBusiness(array $data): Business
    {
        return $this->create($data);
    }

    /**
     * Find the Business by id
     *
     * @param int $id
     *
     * @return Business
     */
    public function findBusinessById(int $id): Business
    {
        try {
            return $this->findOneOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new BusinessNotFoundException;
        }
    }

    /**
     * Update Business
     *
     * @param array $params
     *
     * @return bool
     */
    public function updateBusiness(array $params): bool
    {

        return $this->update($params);
    }



    /**
     * @return bool
     * @throws \Exception
     */
    public function deleteBusiness() : bool
    {
        return $this->delete();
    }
}
