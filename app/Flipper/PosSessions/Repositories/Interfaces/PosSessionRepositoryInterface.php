<?php

namespace App\Flipper\PosSessions\Repositories\Interfaces;

use Jsdecena\Baserepo\BaseRepositoryInterface;
use App\Flipper\Branch\Branch;
use App\Flipper\PosSessions\PosSession;
use Illuminate\Support\Collection;

interface PosSessionRepositoryInterface extends BaseRepositoryInterface
{
    public function listPosSessions(string $order = 'id', string $sort = 'desc', array $columns = ['*']) : Collection;

    public function createPosSession(array $data) : PosSession;

    public function updatePosSession(array $data) : bool;

    public function findPosSessionById(int $id) : PosSession;

    public function deletePosSession(PosSession $PosSession) : bool;

    public function removePosSession() : bool;

    public function searchPosSession(string $text) : Collection;

    public function findBranch():Branch;
}
