<?php

namespace App\Flipper\Business;

use Illuminate\Database\Eloquent\Model;
use App\Flipper\Items\Item;
use App\Flipper\Categories\Category;
use App\Flipper\Branch\Branch;
use App\User;

class Business extends Model
{
    protected $table = 'business';
    protected $fillable = [
        'name', 'type', 'address','description','user_id'
    ];

     /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

  /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function branchies()
    {
        return $this->hasMany(Branch::class);
    }

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
