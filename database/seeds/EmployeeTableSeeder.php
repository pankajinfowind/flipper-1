<?php

use App\Flipper\Employees\Employee;
use App\Flipper\Permissions\Permission;
use App\Flipper\Roles\Repositories\RoleRepository;
use App\Flipper\Roles\Role;
use Illuminate\Database\Seeder;

class EmployeeTableSeeder extends Seeder
{
    public function run()
    {
        $createProductPerm = factory(Permission::class)->create([
            'name' => 'create-product',
            'display_name' => 'Create product'
        ]);

        $viewProductPerm = factory(Permission::class)->create([
            'name' => 'view-product',
            'display_name' => 'View product'
        ]);

        $updateProductPerm = factory(Permission::class)->create([
            'name' => 'update-product',
            'display_name' => 'Update product'
        ]);

        $deleteProductPerm = factory(Permission::class)->create([
            'name' => 'delete-product',
            'display_name' => 'Delete product'
        ]);

        $updateOrderPerm = factory(Permission::class)->create([
            'name' => 'update-order',
            'display_name' => 'Update order'
        ]);
        $saleProductPerm = factory(Permission::class)->create([
            'name' => 'sale-product',
            'display_name' => 'Sale product'
        ]);



        $employee = factory(Employee::class)->create([
            'email' => 'admin@gmail.com'
        ]);

        $admin = factory(Role::class)->create([
            'name' => 'admin',
            'display_name' => 'Admin'
        ]);

        $roleAdminRepo = new RoleRepository($admin);
        $roleAdminRepo->attachToPermission($createProductPerm);
        $roleAdminRepo->attachToPermission($viewProductPerm);
        $roleAdminRepo->attachToPermission($updateProductPerm);
        $roleAdminRepo->attachToPermission($deleteProductPerm);
        $roleAdminRepo->attachToPermission($updateOrderPerm);
        $roleAdminRepo->attachToPermission($saleProductPerm);

        $employee->roles()->save($admin);

        $employee = factory(Employee::class)->create([
            'email' => 'cashier@gmail.com'
        ]);

        $cashier = factory(Role::class)->create([
            'name' => 'cashier',
            'display_name' => 'cashier'
        ]);

        $roleCashierRepo = new RoleRepository($cashier);
        $roleCashierRepo->attachToPermission($viewProductPerm);
        $roleCashierRepo->attachToPermission($saleProductPerm);

        $employee->roles()->save($cashier);
    }
}
