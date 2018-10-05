<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ItemUpdatedTable extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_updated', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('qty')->default(0);
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('items')
                ->onUpdate('cascade')->onDelete('cascade');
                $table->unsignedInteger('stock_id');

            $table->foreign('stock_id')->references('id')->on('stocks')
                    ->onUpdate('cascade')->onDelete('cascade');
            $table->string('updated_by')->default(NULL);
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
        Schema::dropIfExists('item_updated');
    }
}
