<?php

namespace App\Flipper\AttributeValues\Repositories;

use App\Flipper\Attributes\Attribute;
use App\Flipper\AttributeValues\AttributeValue;
use Jsdecena\Baserepo\BaseRepository;
use Illuminate\Support\Collection;

class AttributeValueRepository extends BaseRepository implements AttributeValueRepositoryInterface
{
    /**
     * AttributeValueRepository constructor.
     * @param AttributeValue $attributeValue
     */
    public function __construct(AttributeValue $attributeValue)
    {
        parent::__construct($attributeValue);
        $this->model = $attributeValue;
    }

    /**
     * @param Attribute $attribute
     * @param array $data
     * @return AttributeValue
     */
    public function createAttributeValue(Attribute $attribute, array $data) : AttributeValue
    {
        $attributeValue = new AttributeValue($data);
        $attributeValue->attribute()->associate($attribute);
        $attributeValue->save();
        return $attributeValue;
    }

    /**
     * Create the attribute value and associate to the attribute
     *
     * @param Attribute $attribute
     * @return AttributeValue
     */
    public function associateToAttribute(Attribute $attribute) : AttributeValue
    {
        $this->model->attribute()->associate($attribute);
        $this->model->save();
        return $this->model;
    }

    /**
     * Remove association from the attribute
     */
    public function dissociateFromAttribute() : bool
    {
        return $this->model->delete();
    }

    /**
     * @return Collection
     */
    public function findItemAttributes() : Collection
    {
        return $this->model->itemAttributes()->get();
    }
}
