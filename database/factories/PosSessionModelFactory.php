<?php

use Faker\Generator as Faker;

$factory->define(App\Flipper\PosSessions\PosSession::class, function (Faker $faker) {
    return [
            'session' => '2018-kimirongo',
            'open'=>1,
            'user_id'=>1,
            'branch_id' =>1
          ];
});
