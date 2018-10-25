<?php

use App\Flipper\Categories\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        factory(Category::class)->create([
             'name' => 'Uncategorized',
             'type' => 'uncategorized',
             'parent_id' => 0,
             'business_id'=>1,
             'active' => 1
        ]);
    }
}
