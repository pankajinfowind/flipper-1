<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InvoicesTable extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->string('invoice_code');
            $table->integer('sub_total_amount')->default(0);
            $table->integer('discount')->default(0);
            $table->integer('vat')->default(0);
            $table->integer('total_amount')->default(0);
            $table->string('payment_mode')->default('Cash');
            $table->boolean('paid')->default(true);
            $table->string('customer_name')->default(NULL);
            $table->unsignedInteger('stock_id');
            $table->foreign('stock_id')->references('id')->on('stocks')
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
        Schema::dropIfExists('invoices');
    }
}
