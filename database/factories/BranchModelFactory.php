<?php

use Faker\Generator as Faker;

$factory->define(App\Flipper\Branch\Branch::class, function (Faker $faker) {
    return [
            'name' => $faker->name,
            'business_id'=>1
          ];
});
