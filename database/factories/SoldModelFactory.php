<?php

use Faker\Generator as Faker;

$factory->define(App\Flipper\Solds\Sold::class, function (Faker $faker) {
    return [
        'invoice_no' => '405dd0d43',
        'customer_no'=>'20',
        'sold_date'=>'2018-01-01 11:00',
        'payment_method' =>'Cash',
        'discounts' =>0.0,
        'total_items' =>1,
        'tax' =>18,
        'amount' =>100.00,
        'amount_given' =>200.00,
        'amount_return' =>100.00,
        'currency'=>'Rwf',
        'status'=>'approved',
        'pos_session_id'=>1,
        'branch_id'=>1
          ];
});
