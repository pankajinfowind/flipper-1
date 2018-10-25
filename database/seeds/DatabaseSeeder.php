<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(EmployeeTableSeeder::class);
         $this->call(BusinessTableSeeder::class);
         $this->call(BranchTableSeeder::class);
         $this->call(CategoriesTableSeeder::class);
         $this->call(AttributeTableSeeder::class);
         $this->call(ItemTableSeeder::class);
         $this->call(UserBranchiesTableSeeder::class);
         $this->call(StockTableSeeder::class);


    }
}
