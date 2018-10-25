<?php

use App\Flipper\Items\Item;
use Illuminate\Database\Seeder;

class ItemTableSeeder extends Seeder
{
    public function run()
    {
        factory(Item::class)->create();
    }
}
