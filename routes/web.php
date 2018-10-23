<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'admin', 'middleware' => ['employee'], 'as' => 'admin.' ], function () {
    Route::namespace('Admin')->group(function () {
     //   Route::group(['middleware' => ['role:admin|superadmin|cashier, guard:employee']], function () {
            Route::namespace('Business')->group(function(){
                Route::resource('bussiness', 'BussinessController');

            });
       // });
    });
});

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
