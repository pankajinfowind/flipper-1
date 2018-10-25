<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Flipper\Items\Item;
use Illuminate\Http\UploadedFile;

$factory->define(Item::class, function (Faker\Generator $faker) {
    $item = $faker->unique()->sentence;
    $file = UploadedFile::fake()->image('product.png', 600, 600);

    return [
        'barcode' => $this->faker->numberBetween(2111111, 999999),
        'sku' => $this->faker->numberBetween(1111111, 999999),
        'item' => $item,
        'units' => str_slug($item),
        'price' => 5.00,
        'sale_price' => 6.00,
        'category_id' => 1,
        'business_id' => 1,

    ];
});
