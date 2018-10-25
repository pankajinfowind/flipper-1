<?php

namespace App\Flipper\ItemAttributes\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Flipper\ItemAttributes\Exceptions\ItemAttributeNotFoundException;
use App\Flipper\ItemAttributes\ItemAttribute;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ItemAttributeRepository extends BaseRepository implements ItemAttributeRepositoryInterface
{
    /**
     * ItemAttributeRepository constructor.
     * @param ItemAttribute $itemAttribute
     */
    public function __construct(ItemAttribute $ItemAttribute)
    {
        parent::__construct($itemAttribute);
        $this->model = $itemAttribute;
    }

    /**
     * @param int $id
     * @return mixed
     * @throws ItemAttributeNotFoundException
     */
    public function findItemAttributeById(int $id)
    {
        try {
            return $this->findOneOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new ItemAttributeNotFoundException($e);
        }
    }
}
