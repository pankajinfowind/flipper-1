<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/


use App\Flipper\ItemAttributes\ItemAttribute;
/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(ItemAttribute::class, function (Faker\Generator $faker) {
    return [
        'quantity' => 1,
        'available' => 1,
        'branch_id'=> 1,
        'item_id'=>1
    ];
});
