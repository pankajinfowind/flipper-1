<?php

namespace App\Flipper\ItemAttributes\Repositories;

use Jsdecena\Baserepo\BaseRepositoryInterface;

interface ItemAttributeRepositoryInterface extends BaseRepositoryInterface
{
    public function findItemAttributeById(int $id);
}
