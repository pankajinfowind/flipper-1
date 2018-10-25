<?php

namespace App\Flipper\AttributeValues;

use App\Flipper\Attributes\Attribute;
use App\Flipper\ItemAttributes\ItemAttribute;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    protected $fillable = [
        'value'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function itemAttributes()
    {
        return $this->belongsToMany(ItemAttribute::class);
    }
}
