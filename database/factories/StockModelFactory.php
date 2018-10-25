<?php

use Faker\Generator as Faker;

$factory->define(App\Flipper\Stocks\Stock::class, function (Faker $faker) {
    return [
            'name' => $faker->name,
            'is_new'=>1,
            'branch_id'=>1
          ];
});
