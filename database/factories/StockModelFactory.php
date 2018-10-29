<?php

use Faker\Generator as Faker;

$factory->define(App\Flipper\Stocks\Stock::class, function (Faker $faker) {
    return [
            'available' => 1,
            'openning_stock_qty'=>20,
            'minimum_stock_qty'=>0,
            'item_id' =>1,
            'branch_id' =>1
          ];
});
