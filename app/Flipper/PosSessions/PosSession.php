<?php

namespace App\Flipper\PosSessions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Nicolaslopezj\Searchable\SearchableTrait;
use App\Flipper\Branch\Branch;

class PosSession extends Model
{
    use SearchableTrait;

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        'columns' => [
            'pos_session.session' => 10
        ]
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'session',
        'open',
        'user_id',
        'branch_id',
    ];


    /**
     * @param string $term
     * @return Collection
     */
    public function searchPosSession(string $term) : Collection
    {
        return self::search($term)->get();
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

     /**
     * The users that belong to the role.
     */
    // public function items()
    // {
    //     return $this->belongsToMany('App\User');
    // }
}
