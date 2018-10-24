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
        $table->string('inv_reference')->unique();
        $table->string('payment_method');
        $table->decimal('discounts')->default(0.00);
        $table->decimal('total_items');
        $table->decimal('tax')->default(0.00);
        $table->decimal('total');
        $table->decimal('total_paid')->default(0.00);
        $table->enum('status', ['cancel', 'approve', 'pending']);
        $table->unsignedInteger('branch_id');
        $table->foreign('branch_id')->references('id')->on('branch')
        ->onUpdate('cascade')->onDelete('cascade');
        $table->unsignedInteger('order_id');

        $table->foreign('order_id')->references('id')->on('orders')
        ->onUpdate('cascade')->onDelete('cascade');

        $table->unsignedInteger('pos_session_id');
        $table->foreign('pos_session_id')->references('id')->on('pos_session')
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
