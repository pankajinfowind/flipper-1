<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StockPosSessionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pos_session', function (Blueprint $table) {
            $table->increments('id');
            $table->string('session')->unique();
            $table->boolean('active')->default(true);
            $table->unsignedInteger('branch_branch_id');
            $table->foreign('branch_branch_id')->references('id')->on('branch_user')
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
        Schema::dropIfExists('pos_session');
    }
}
