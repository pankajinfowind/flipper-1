<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'cors'], function() {
        Route::group(['middleware' => 'auth:api'], function() {
            Route::namespace('Admin')->group(function () {
                        Route::namespace('Business')->group(function(){
                                Route::resource('business', 'BussinessController');
                            });
                            Route::namespace('Branch')->group(function(){
                               Route::resource('branch', 'BranchController');
                               Route::get('show-branch/{id}', 'BranchController@show');
                               Route::post('attach-user-branch', 'BranchController@attachUserBranch');
                            });
                            Route::namespace('Categories')->group(function(){
                                Route::resource('category', 'CategoryController');
                                Route::get('show-category/{id}', 'CategoryController@show');
                             });
            });
        });
});
