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

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Flipper\Categories\Category;

$factory->define(Category::class, function (Faker\Generator $faker) {
    $type = $faker->unique()->randomElement([
        'Gear',
        'Clothing',
        'Shoes',
        'Diapering',
        'Feeding',
        'Bath',
        'Toys',
        'Nursery',
        'Household',
        'Grocery'
    ]);


    return [
        'name' =>  $faker->name,
        'type' =>  $type,
        'parent_id' => 0,
        'business_id'=>1,
        'active' => 1
    ];
});
