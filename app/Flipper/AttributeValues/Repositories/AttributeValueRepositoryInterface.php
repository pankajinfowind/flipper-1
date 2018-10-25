<?php

namespace App\Flipper\AttributeValues\Repositories;

use App\Flipper\Attributes\Attribute;
use App\Flipper\AttributeValues\AttributeValue;
use Jsdecena\Baserepo\BaseRepositoryInterface;
use Illuminate\Support\Collection;

interface AttributeValueRepositoryInterface extends BaseRepositoryInterface
{
    public function createAttributeValue(Attribute $attribute, array $data) : AttributeValue;

    public function associateToAttribute(Attribute $attribute) : AttributeValue;

    public function dissociateFromAttribute() : bool;

    public function findItemAttributes() : Collection;
}
