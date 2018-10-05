<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CurrentyItemsQtys extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currenty_items_qty', function (Blueprint $table) {
            $table->integer('stock_id');
            $table->integer('item_id');
            $table->integer('qty')->default(0);
            $table->timestamps();
            $table->primary(['stock_id','item_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('currenty_items_qty');
    }
}
