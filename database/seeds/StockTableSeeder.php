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
                'name' => '2018-01-1/kimorongo',
                'is_new'=>1,
                'branch_id'=>1

            ]);
    }

}
