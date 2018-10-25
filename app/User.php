<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laratrust\Traits\LaratrustUserTrait;
use App\Flipper\Branch\Branch;
class User extends Authenticatable
{
    use LaratrustUserTrait;
    use HasApiTokens, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function bussinesses(){
        return $this->hasMany(Bussiness::class);
    }
/**
     * Get the business record associated with the user.
     */
    public function business()
    {
        return $this->hasOne('App\Flipper\Business\Business');
    }
    public function branchies()
    {
        return $this->belongsToMany(Branch::class);
    }
}
