<?php

namespace App\Flipper\Solds\Transformations;

use App\Flipper\Solds\Sold;
use Illuminate\Support\Facades\Storage;

trait SoldTransformable
{
    /**
     * Transform the Sold
     *
     * @param Sold $sold
     * @return Sold
     */
    protected function transformSold(Sold $sold)
    {
        $soldRepo = new Sold;
        $soldRepo->id = (int) $sold->id;
        $soldRepo->invoice_no = $sold->invoice_no;
        $soldRepo->customer_no = $sold->customer_no;
        $soldRepo->sold_date = $sold->sold_date;
        $soldRepo->payment_method = $sold->payment_method;
        $soldRepo->discounts = $sold->discounts;
        $soldRepo->total_items = $sold->total_items;
        $soldRepo->tax = $sold->tax;
        $soldRepo->total = $sold->total;
        $soldRepo->total_paid = $sold->total_paid;
        $soldRepo->status = $sold->status;
        $soldRepo->status = $sold->pos_session_id;
        $soldRepo->created_at = $sold->created_at;
        $soldRepo->updated_at = $sold->updated_at;

        return $soldRepo;
    }
}
