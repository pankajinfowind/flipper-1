<?php

namespace App\Flipper\Solds\Repositories;
use App\Flipper\Solds\Exceptions\SoldCreateErrorException;
use App\Flipper\Solds\Exceptions\SoldUpdateErrorException;
use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Business\Business;
use App\Flipper\Solds\Exceptions\SoldNotFoundException;
use App\Flipper\Solds\Sold;
use App\Flipper\Solds\Repositories\Interfaces\SoldRepositoryInterface;
use App\Flipper\Solds\Transformations\SoldTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SoldRepository extends BaseRepository implements SoldRepositoryInterface
{
    use SoldTransformable;

    /**
     * SoldRepository constructor.
     * @param Sold $Sold
     */
    public function __construct(Sold $Sold)
    {
        parent::__construct($Sold);
        $this->model = $Sold;
    }

    /**
     * List all the Solds
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return Collection
     */
    public function listSolds(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * Create the Sold
     *
     * @param array $data
     *
     * @return Sold
     * @throws SoldCreateErrorException
     */
    public function createSold(array $data) : Sold
    {
        try {
            $this->model->branch()->associate($data);
            $this->model->save();
            return $this->model;
        } catch (QueryException $e) {
            throw new SoldCreateErrorException($e);
        }
    }

    /**
     * Update the Sold
     *
     * @param array $data
     *
     * @return bool
     * @throws SoldUpdateErrorException
     */
    public function updateSold(array $data) : bool
    {
        try {
            return $this->model->update($data);
        } catch (QueryException $e) {
            throw new SoldUpdateErrorException($e);
        }
    }

    /**
     * Find the Sold by ID
     *
     * @param int $id
     *
     * @return Sold
     * @throws SoldNotFoundException
     */
    public function findSoldById(int $id) : Sold
    {
        try {
            return $this->transformSold($this->findOneOrFail($id));
        } catch (ModelNotFoundException $e) {
            throw new SoldNotFoundException($e);
        }
    }

    /**
     * Delete the Sold
     *
     * @param Sold $Sold
     *
     * @return bool
     * @throws \Exception
     * @deprecated
     * @use removeSold
     */
    public function deleteSold(Sold $Sold) : bool
    {
        return $Sold->delete();
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function removeSold() : bool
    {
        return $this->model->delete();
    }






    /**
     * @param string $text
     * @return mixed
     */
    public function searchSold(string $text) : Collection
    {
        if (!empty($text)) {
            return $this->model->searchSold($text);
        } else {
            return $this->listSolds();
        }
    }



    /**
     * Return the branch which the Sold is associated with
     *
     * @return Branch
     */
    public function findBranch():Branch
    {
        return $this->model->branch;
    }
}
