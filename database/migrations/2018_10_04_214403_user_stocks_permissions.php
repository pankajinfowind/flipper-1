<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserStocksPermissions extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_stocks_permission', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('stock_id');
            $table->boolean('switched')->default(true)->unique();
            $table->text('permissions')->nullable();
            $table->timestamps();
            $table->primary(['user_id','stock_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_stocks_permission');
    }
}
