<?php
use App\Flipper\Stocks\Stock;
use Illuminate\Database\Seeder;

class StockTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

        public function run()
        {
            factory(Stock::class)->create([
                'available' => 1,
                'openning_stock_qty'=>20,
                'minimum_stock_qty'=>0,
                'item_id' =>1,
                'branch_id' =>1
            ]);
    }

}
