<?php

use App\Flipper\Business\Business;
use Illuminate\Database\Seeder;

class BusinessTableSeeder extends Seeder
{
    public function run()
    {
        factory(Business::class)->create([
            'name' => 'Kiphrama',
            'type' => 'Pharamacy',
            'address' => 'remera,kigali,rwanda',
            'tin' => '10101010101',
            'tax_charge' => 18,
            'currency_code' => 'RWF',
            'currency_symbol' => 'RWF',
            'web_url' => 'www.kipharama.rw',
            'zip_code' => '100',
            'description' => 'pharamcy for better to you',
            'user_id'=>1

        ]);
    }
}
