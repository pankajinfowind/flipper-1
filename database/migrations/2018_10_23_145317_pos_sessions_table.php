<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PosSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pos_sessions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('session')->unique();
            $table->boolean('open')->default(true);

            $table->unsignedInteger('user_id');
            $table->unsignedInteger('branch_id');
            $table->foreign('branch_id')->references('id')->on('branch')
            ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('user_id')->references('id')->on('users')
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
        Schema::dropIfExists('pos_sessions');
    }
}
