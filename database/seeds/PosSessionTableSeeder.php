<?php

use Illuminate\Database\Seeder;
use App\Flipper\PosSessions\PosSession;

class PosSessionTableSeeder extends Seeder
{
    public function run()
    {
        factory(PosSession::class)->create([
             'session' => '2018-kimirongo',
             'open' =>1,
             'user_id' => 1,
             'branch_id' => 1,
        ]);
    }
}
