<?php

namespace App\Providers;

use App\Flipper\Employees\Repositories\EmployeeRepository;
use App\Flipper\Employees\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Flipper\Permissions\Repositories\PermissionRepository;
use App\Flipper\Permissions\Repositories\Interfaces\PermissionRepositoryInterface;
use App\Flipper\Roles\Repositories\RoleRepository;
use App\Flipper\Roles\Repositories\RoleRepositoryInterface;
use App\Flipper\Business\Repositories\Interfaces\BusinessRepositoryInterface;
use App\Flipper\Business\Repositories\BusinessRepository;
use Illuminate\Support\ServiceProvider;
use App\Flipper\Branch\Repositories\Interfaces\BranchRepositoryInterface;
use App\Flipper\Branch\Repositories\BranchRepository;
use App\Flipper\Categories\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Flipper\Categories\Repositories\CategoryRepository;
class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {

        $this->app->bind(
            EmployeeRepositoryInterface::class,
            EmployeeRepository::class
        );


        $this->app->bind(
            RoleRepositoryInterface::class,
            RoleRepository::class
        );

        $this->app->bind(
            PermissionRepositoryInterface::class,
            PermissionRepository::class
        );

        $this->app->bind(
            BusinessRepositoryInterface::class,
            BusinessRepository::class
        );
        $this->app->bind(
            BranchRepositoryInterface::class,
            BranchRepository::class
        );
        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );

    }
}
