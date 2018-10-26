<?php

namespace App\Flipper\PosSessions\Repositories;
use App\Flipper\PosSessions\Exceptions\PosSessionCreateErrorException;
use App\Flipper\PosSessions\Exceptions\PosSessionUpdateErrorException;
use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\Business\Business;
use App\Flipper\PosSessions\Exceptions\PosSessionNotFoundException;
use App\Flipper\PosSessions\PosSession;
use App\Flipper\PosSessions\Repositories\Interfaces\PosSessionRepositoryInterface;
use App\Flipper\PosSessions\Transformations\PosSessionTransformable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PosSessionRepository extends BaseRepository implements PosSessionRepositoryInterface
{
    use PosSessionTransformable;

    /**
     * PosSessionRepository constructor.
     * @param PosSession $PosSession
     */
    public function __construct(PosSession $PosSession)
    {
        parent::__construct($PosSession);
        $this->model = $PosSession;
    }

    /**
     * List all the PosSessions
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return Collection
     */
    public function listPosSessions(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection
    {
        return $this->all($columns, $order, $sort);
    }

    /**
     * Create the PosSession
     *
     * @param array $data
     *
     * @return PosSession
     * @throws PosSessionCreateErrorException
     */
    public function createPosSession(array $data) : PosSession
    {
        try {
            $this->model->branch()->associate($data);
            $this->model->save();
            return $this->model;
        } catch (QueryException $e) {
            throw new PosSessionCreateErrorException($e);
        }
    }

    /**
     * Update the PosSession
     *
     * @param array $data
     *
     * @return bool
     * @throws PosSessionUpdateErrorException
     */
    public function updatePosSession(array $data) : bool
    {
        try {
            return $this->model->update($data);
        } catch (QueryException $e) {
            throw new PosSessionUpdateErrorException($e);
        }
    }

    /**
     * Find the PosSession by ID
     *
     * @param int $id
     *
     * @return PosSession
     * @throws PosSessionNotFoundException
     */
    public function findPosSessionById(int $id) : PosSession
    {
        try {
            return $this->transformPosSession($this->findOneOrFail($id));
        } catch (ModelNotFoundException $e) {
            throw new PosSessionNotFoundException($e);
        }
    }

    /**
     * Delete the PosSession
     *
     * @param PosSession $PosSession
     *
     * @return bool
     * @throws \Exception
     * @deprecated
     * @use removePosSession
     */
    public function deletePosSession(PosSession $PosSession) : bool
    {
        return $PosSession->delete();
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function removePosSession() : bool
    {
        return $this->model->delete();
    }






    /**
     * @param string $text
     * @return mixed
     */
    public function searchPosSession(string $text) : Collection
    {
        if (!empty($text)) {
            return $this->model->searchPosSession($text);
        } else {
            return $this->listPosSessions();
        }
    }



    /**
     * Return the branch which the PosSession is associated with
     *
     * @return Branch
     */
    public function findBranch():Branch
    {
        return $this->model->branch;
    }
}
