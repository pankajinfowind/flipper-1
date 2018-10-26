<?php

namespace App\Flipper\Solds;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Nicolaslopezj\Searchable\SearchableTrait;
use App\Flipper\Items\Item;

class Sold extends Model
{
    use SearchableTrait;

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        'columns' => [
            'solds.openning_stock_qty' => 10,
            'solds.minimum_stock_qty' => 10
        ]
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'available',
        'openning_stock_qty',
        'minimum_stock_qty',
        'item_id',
        'branch_id',
    ];


    /**
     * @param string $term
     * @return Collection
     */
    public function searchSold(string $term) : Collection
    {
        return self::search($term)->get();
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function items()
    {
        return $this->belongsToMany(Item::class);
    }

     /**
     * The users that belong to the role.
     */
    // public function items()
    // {
    //     return $this->belongsToMany('App\User');
    // }
}
