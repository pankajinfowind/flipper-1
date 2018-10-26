<?php

namespace App\Flipper\AttributeValues;

use App\Flipper\Attributes\Attribute;
use Illuminate\Database\Eloquent\Model;
use App\Flipper\Items\Item;
use App\Flipper\Branch\Branch;

class AttributeValue extends Model
{
    protected $fillable = [
        'value','attribute_id','item_id','branch_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function attribute()
    {
       return $this->belongsTo(Attribute::class);
    }

    public function branch()
    {
       return $this->belongsTo(Branch::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function items()
    {
        return $this->belongsTo(Item::class);
    }
}
