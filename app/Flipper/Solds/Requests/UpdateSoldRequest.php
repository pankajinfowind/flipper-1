<?php

namespace App\Flipper\Solds\Requests;

use App\Flipper\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateSoldRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'invoice_no' => ['required','unique:sold'],
            'sold_date' => ['required'],
            'payment_method' => ['required'],
            'discounts' => ['required'],
            'total_items' => ['required'],
            'tax' => ['required'],
            'total' => ['required'],
            'total_paid' => ['required'],
            'status' => ['required'],
            'pos_session_id' => ['pos_session_id'],
        ];
    }
}
