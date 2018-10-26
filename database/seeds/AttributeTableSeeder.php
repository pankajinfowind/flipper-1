<?php

use App\Flipper\Attributes\Attribute;
use App\Flipper\AttributeValues\AttributeValue;
use Illuminate\Database\Seeder;

class AttributeTableSeeder extends Seeder
{
    public function run()
    {
        $sizeAttr = factory(Attribute::class)->create(['name' => 'Size']);
        factory(AttributeValue::class)->create([
            'value' => 'small',
            'attribute_id' => $sizeAttr->id,
            'item_id' => 1,
            'branch_id' => 1
        ]);


        $expAttr = factory(Attribute::class)->create(['name' => 'Expired_date']);
        factory(AttributeValue::class)->create([
            'value' => '2018-04-12',
            'attribute_id' => $expAttr->id,
            'item_id' => 1,
            'branch_id' => 1
        ]);


        $colorAttr = factory(Attribute::class)->create(['name' => 'Color']);

        factory(AttributeValue::class)->create([
            'value' => 'Green',
            'attribute_id' => $colorAttr->id,
            'item_id' => 1,
            'branch_id' => 1
        ]);

    }
}
