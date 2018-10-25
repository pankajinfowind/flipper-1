<?php
use App\Flipper\Branch\Branch;
use Illuminate\Database\Seeder;

class BranchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

        public function run()
        {
            factory(Branch::class)->create([
                'name' => 'Kimirongo',
                'business_id'=>1

            ]);
    }

}
