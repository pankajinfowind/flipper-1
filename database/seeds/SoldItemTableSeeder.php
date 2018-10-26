<?php

use Illuminate\Database\Seeder;
use App\Flipper\Solds\Sold;
use App\Flipper\Items\Item;
class SoldItemTableSeeder extends Seeder
{
    public function run()
    {
        factory(Sold::class)->create()->each(function (Sold $sold) {
            factory(Item::class)->make()->each(function(Item $item) use ($sold) {
                $sold->items()->attach($item, ['quantity' => 1,'branch_id'=>1]);
            });
        });
    }
}
