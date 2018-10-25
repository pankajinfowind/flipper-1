<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Flipper\Branch\Branch;

class UserBranchiesTableSeeder extends Seeder
{
    public function run()
    {
        factory(User::class)->create()->each(function (User $user) {
            factory(Branch::class)->make()->each(function(Branch $item) use ($user) {
                $user->branchies()->save($item);
            });
        });
    }
}
