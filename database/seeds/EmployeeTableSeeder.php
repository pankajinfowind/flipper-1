<?php

use App\User;
use App\Flipper\Permissions\Permission;
use App\Flipper\Roles\Repositories\RoleRepository;
use App\Flipper\Roles\Role;
use Illuminate\Database\Seeder;

class EmployeeTableSeeder extends Seeder
{
    public function run()
    {

        // MANAGE BUSINESS
        $createBusinessPerm = factory(Permission::class)->create([
            'name' => 'create-business',
            'display_name' => 'Create business'
        ]);

        $viewBusinessPerm = factory(Permission::class)->create([
            'name' => 'view-business',
            'display_name' => 'View business'
        ]);

        $updateBusinessPerm = factory(Permission::class)->create([
            'name' => 'update-business',
            'display_name' => 'Update business'
        ]);

        $deletBusinessPerm = factory(Permission::class)->create([
            'name' => 'delete-business',
            'display_name' => 'Delete business'
        ]);

        // END OF MANAGE BUSINESS
//...............................................................................

        // MANAGE BRANCH

        $createBranchPerm = factory(Permission::class)->create([
            'name' => 'create-branch',
            'display_name' => 'Create branch'
        ]);

        $viewBranchPerm = factory(Permission::class)->create([
            'name' => 'view-branch',
            'display_name' => 'View branch'
        ]);

        $updateBranchPerm = factory(Permission::class)->create([
            'name' => 'update-branch',
            'display_name' => 'Update branch'
        ]);

        $deleteBranchPerm = factory(Permission::class)->create([
            'name' => 'delete-branch',
            'display_name' => 'Delete branch'
        ]);

        // END OF MANAGE Branch

//......................................................................

        $updateCategoryPerm = factory(Permission::class)->create([
            'name' => 'update-category',
            'display_name' => 'Update category'
        ]);

        $createCategoryPerm = factory(Permission::class)->create([
            'name' => 'create-category',
            'display_name' => 'Create category'
        ]);
        $deleteCategoryPerm = factory(Permission::class)->create([
            'name' => 'delete-category',
            'display_name' => 'Delete category'
        ]);
        $viewCategoryPerm = factory(Permission::class)->create([
            'name' => 'view-category',
            'display_name' => 'View category'
        ]);

//...............................................................................

        // MANAGE ITEM
        $createItemPerm = factory(Permission::class)->create([
            'name' => 'create-item',
            'display_name' => 'Create item'
        ]);

        $viewItemPerm = factory(Permission::class)->create([
            'name' => 'view-item',
            'display_name' => 'View item'
        ]);

        $updateItemPerm = factory(Permission::class)->create([
            'name' => 'update-item',
            'display_name' => 'Update item'
        ]);

        $deleteItemPerm = factory(Permission::class)->create([
            'name' => 'delete-item',
            'display_name' => 'Delete item'
        ]);

        // END OF MANAGE ITEM

        //...............................................................................

        $updateOrderPerm = factory(Permission::class)->create([
            'name' => 'update-order',
            'display_name' => 'Update order'
        ]);

        $createOrderPerm = factory(Permission::class)->create([
            'name' => 'create-order',
            'display_name' => 'Create order'
        ]);
        $deleteOrderPerm = factory(Permission::class)->create([
            'name' => 'delete-order',
            'display_name' => 'Delete order'
        ]);
        $viewOrderPerm = factory(Permission::class)->create([
            'name' => 'view-order',
            'display_name' => 'View order'
        ]);

//...............................................................................

          $cancelInvoicePerm = factory(Permission::class)->create([
                'name' => 'cancel-invoice',
                'display_name' => 'Cancel invoice'
            ]);

            $createInvoicePerm = factory(Permission::class)->create([
                'name' => 'create-invoice',
                'display_name' => 'Create invoice'
            ]);

            $deleteInvoicePerm = factory(Permission::class)->create([
                'name' => 'delete-invoice',
                'display_name' => 'Delete invoice'
            ]);
            $viewInvoicePerm = factory(Permission::class)->create([
                'name' => 'view-invoice',
                'display_name' => 'View invoice'
            ]);
//....................................................................................

        $updateStockPerm = factory(Permission::class)->create([
            'name' => 'update-stock',
            'display_name' => 'Update stock'
        ]);

        $createStockPerm = factory(Permission::class)->create([
            'name' => 'create-stock',
            'display_name' => 'Create stock'
        ]);
        $deleteStockPerm = factory(Permission::class)->create([
            'name' => 'delete-stock',
            'display_name' => 'Delete stock'
        ]);
//....................................................................................

        $updatePosSessionPerm = factory(Permission::class)->create([
            'name' => 'update-pos-session',
            'display_name' => 'Update pos session'
        ]);

        $createPosSessionPerm = factory(Permission::class)->create([
            'name' => 'create-pos-session',
            'display_name' => 'Create pos session'
        ]);
        $deletePosSessionPerm = factory(Permission::class)->create([
            'name' => 'delete-pos-session',
            'display_name' => 'Delete pos session'
        ]);

        $viewPosSessionPerm = factory(Permission::class)->create([
            'name' => 'view-pos-session',
            'display_name' => 'View pos session'
        ]);

//.......................................................................................................

       $grantUserBranchPerm = factory(Permission::class)->create([
            'name' => 'grant-user-branch',
            'display_name' => 'Grant user to branch'
        ]);

        $revokeUserBranchPerm = factory(Permission::class)->create([
            'name' => 'revoke-user-branch',
            'display_name' => 'Revoke user to branch'
        ]);
        $viewUserBranchPerm = factory(Permission::class)->create([
            'name' => 'view-user-branch',
            'display_name' => 'View user to branch'
        ]);



//...............................................................................

        $employee = factory(User::class)->create([
            'email' => 'ganza@yegobox.com'
        ]);

        $admin = factory(Role::class)->create([
            'name' => 'admin',
            'display_name' => 'Business Admin'
        ]);

        $roleAdminRepo = new RoleRepository($admin);
        //business
        $roleAdminRepo->attachToPermission($createBusinessPerm );
        $roleAdminRepo->attachToPermission($updateBusinessPerm );
        $roleAdminRepo->attachToPermission($deletBusinessPerm);
        $roleAdminRepo->attachToPermission($viewBusinessPerm);
        // branch
        $roleAdminRepo->attachToPermission($createBranchPerm );
        $roleAdminRepo->attachToPermission($updateBranchPerm );
        $roleAdminRepo->attachToPermission($deleteBranchPerm);
        $roleAdminRepo->attachToPermission($viewBranchPerm);
        // item
        $roleAdminRepo->attachToPermission($createItemPerm);
        $roleAdminRepo->attachToPermission($viewItemPerm);
        $roleAdminRepo->attachToPermission($updateItemPerm);
        $roleAdminRepo->attachToPermission($deleteItemPerm);

        //order
        $roleAdminRepo->attachToPermission($updateOrderPerm);
        $roleAdminRepo->attachToPermission($createOrderPerm);
        $roleAdminRepo->attachToPermission($deleteOrderPerm);
        $roleAdminRepo->attachToPermission($viewOrderPerm);

        //category
        $roleAdminRepo->attachToPermission($viewCategoryPerm );
        $roleAdminRepo->attachToPermission($createCategoryPerm);
        $roleAdminRepo->attachToPermission($deleteCategoryPerm);
        $roleAdminRepo->attachToPermission($updateCategoryPerm);

        //invoice
        $roleAdminRepo->attachToPermission($cancelInvoicePerm );
        $roleAdminRepo->attachToPermission($createInvoicePerm );
        $roleAdminRepo->attachToPermission($deleteInvoicePerm);
        $roleAdminRepo->attachToPermission($viewInvoicePerm);

         //pos session
         $roleAdminRepo->attachToPermission($updatePosSessionPerm);
         $roleAdminRepo->attachToPermission($createPosSessionPerm );
         $roleAdminRepo->attachToPermission($deletePosSessionPerm);
         $roleAdminRepo->attachToPermission($viewPosSessionPerm);

          //user and branch
          $roleAdminRepo->attachToPermission($grantUserBranchPerm);
          $roleAdminRepo->attachToPermission($revokeUserBranchPerm );
          $roleAdminRepo->attachToPermission($viewUserBranchPerm);

        $employee->roles()->save($admin);

        // .....................................Manager ...............................

        $employee = factory(User::class)->create([
            'email' => 'eric@yegobox.com'
        ]);

        $manager = factory(Role::class)->create([
            'name' => 'manager',
            'display_name' => 'Branch Manager'
        ]);

        $roleManagerRepo = new RoleRepository($manager);
        $roleManagerRepo->attachToPermission($viewItemPerm);

         //order
         $roleManagerRepo->attachToPermission($updateOrderPerm);
         $roleManagerRepo->attachToPermission($createOrderPerm);
         $roleManagerRepo->attachToPermission($deleteOrderPerm);
         $roleManagerRepo->attachToPermission($viewOrderPerm);

        //invoice
        $roleManagerRepo->attachToPermission($cancelInvoicePerm);
        $roleManagerRepo->attachToPermission($createInvoicePerm);
        $roleManagerRepo->attachToPermission($viewInvoicePerm);

        // pos session
        $roleManagerRepo->attachToPermission($updatePosSessionPerm);
        $roleManagerRepo->attachToPermission($createPosSessionPerm );
        $roleManagerRepo->attachToPermission($deletePosSessionPerm);
        $roleManagerRepo->attachToPermission($viewPosSessionPerm);

        $employee->roles()->save($manager);

        $employee = factory(User::class)->create([
            'email' => 'keza@yegobox.com'
        ]);

        $cashier = factory(Role::class)->create([
            'name' => 'cashier',
            'display_name' => 'Cashier'
        ]);

        $roleCashierRepo = new RoleRepository($cashier);
        //order
        $roleCashierRepo->attachToPermission($createOrderPerm);
        //invoice
        $roleCashierRepo->attachToPermission($createInvoicePerm);
        // pos session
        $roleCashierRepo->attachToPermission($createPosSessionPerm);
        $roleCashierRepo->attachToPermission($viewPosSessionPerm);

        $employee->roles()->save($cashier);
    }
}
