<?php

namespace App\Flipper\Attributes;

use App\Flipper\AttributeValues\AttributeValue;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = [
        'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class);
    }
}
