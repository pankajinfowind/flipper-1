<?php

namespace App\Flipper\Business;

use Illuminate\Database\Eloquent\Model;

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

    public function products()
    {
        // return $this->belongsToMany(Stock::class);
    }

    /**
         * Get the user that owns the business.
     */

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
