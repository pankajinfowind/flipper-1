<?php

namespace App\Flipper\Stocks\Repositories;
use App\Flipper\Stocks\Exceptions\StockCreateErrorException;
use App\Flipper\Stocks\Exceptions\StockUpdateErrorException;
use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Business\Business;
use App\Flipper\Stocks\Exceptions\StockNotFoundException;
use App\Flipper\Stocks\Stock;
use App\Flipper\Stocks\Repositories\Interfaces\StockRepositoryInterface;
use App\Flipper\Stocks\Transformations\StockTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class StockRepository extends BaseRepository implements StockRepositoryInterface
{
    use StockTransformable;

    /**
     * StockRepository constructor.
     * @param Stock $Stock
     */
    public function __construct(Stock $Stock)
    {
        parent::__construct($Stock);
        $this->model = $Stock;
    }

    /**
     * List all the Stocks
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return Collection
     */
    public function listStocks(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * Create the Stock
     *
     * @param array $data
     *
     * @return Stock
     * @throws StockCreateErrorException
     */
    public function createStock(array $data) : Stock
    {
        try {
            $this->model->branch()->associate($data);
            $this->model->save();
            return $this->model;
        } catch (QueryException $e) {
            throw new StockCreateErrorException($e);
        }
    }

    /**
     * Update the Stock
     *
     * @param array $data
     *
     * @return bool
     * @throws StockUpdateErrorException
     */
    public function updateStock(array $data) : bool
    {
        try {
            return $this->model->update($data);
        } catch (QueryException $e) {
            throw new StockUpdateErrorException($e);
        }
    }

    /**
     * Find the Stock by ID
     *
     * @param int $id
     *
     * @return Stock
     * @throws StockNotFoundException
     */
    public function findStockById(int $id) : Stock
    {
        try {
            return $this->transformStock($this->findOneOrFail($id));
        } catch (ModelNotFoundException $e) {
            throw new StockNotFoundException($e);
        }
    }

    /**
     * Delete the Stock
     *
     * @param Stock $Stock
     *
     * @return bool
     * @throws \Exception
     * @deprecated
     * @use removeStock
     */
    public function deleteStock(Stock $Stock) : bool
    {
        return $Stock->delete();
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function removeStock() : bool
    {
        return $this->model->delete();
    }






    /**
     * @param string $text
     * @return mixed
     */
    public function searchStock(string $text) : Collection
    {
        if (!empty($text)) {
            return $this->model->searchStock($text);
        } else {
            return $this->listStocks();
        }
    }



    /**
     * Return the branch which the Stock is associated with
     *
     * @return Branch
     */
    public function findBranch():Branch
    {
        return $this->model->branch;
    }
}
