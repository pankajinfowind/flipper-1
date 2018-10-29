<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ItemSoldTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_sold', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('sold_id');
            $table->unsignedInteger('item_id');
            $table->integer('quantity');

            $table->foreign('sold_id')->references('id')->on('solds')
            ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('item_id')->references('id')->on('items')
            ->onUpdate('cascade')->onDelete('cascade');

            $table->unsignedInteger('branch_id');
            $table->foreign('branch_id')->references('id')->on('branch')
            ->onUpdate('cascade')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_sold');
    }
}
