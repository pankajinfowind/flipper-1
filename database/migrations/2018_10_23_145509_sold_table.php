<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class soldTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solds', function (Blueprint $table) {
            $table->increments('id');
            $table->string('invoice_no');
            $table->string('customer_no')->nullable();
            $table->dateTime('sold_date');

            $table->string('payment_method');
            $table->decimal('discounts')->default(0.00);
            $table->decimal('total_items');
            $table->decimal('tax')->default(0.00);
            $table->decimal('amount')->default(0.00);
            $table->decimal('amount_given')->default(0.00);
            $table->decimal('amount_return')->default(0.00);
            $table->string('currency')->default('Rwf');
            $table->enum('status', ['cancel', 'approved', 'pending']);

            $table->unsignedInteger('pos_session_id');
            $table->foreign('pos_session_id')->references('id')->on('pos_sessions')
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
        Schema::dropIfExists('solds');
    }
}
