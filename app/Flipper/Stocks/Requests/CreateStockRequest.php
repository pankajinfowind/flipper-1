<?php

namespace App\Flipper\Stocks\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateStockRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required','unique:stocks'],
            'is_new' => ['required'],
            'branch_id' => ['required'],
        ];
    }
}
