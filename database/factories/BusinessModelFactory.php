<?php


$factory->define(App\Flipper\Business\Business::class, function (Faker\Generator $faker) {
    $type = $faker->unique()->randomElement([
        'Gear',
        'Clothing',
        'Shoes',
        'Diapering',
        'Feeding',
        'Bath',
        'Toys',
        'Nursery',
        'Household',
        'Grocery'
    ]);
    return [
        'name' => $faker->name,
        'type' => $type,
        'address' => $faker->address,
        'tin' => '10101010101',
        'tax_charge' => 18,
        'currency_code' => 'RWF',
        'currency_symbol' => 'RWF',
        'web_url' => $faker->url,
        'zip_code' => $faker->word,
        'description' => $faker->paragraph,
        'user_id'=>1

    ];
});
