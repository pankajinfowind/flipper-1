<?php

namespace App\Flipper\Branch;

use Illuminate\Database\Eloquent\Model;
use App\Flipper\Business\Business;
use App\User;
use App\Flipper\Stock\Stock;
use App\Flipper\AttributeValues\AttributeValue;

class Branch extends Model
{
    protected $table = 'branch';
    protected $fillable = [
        'name', 'business_id'
    ];

 /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function stocks()
    {
        return $this->belongsToMany(Stock::class);
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class);
    }
}
