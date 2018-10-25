<?php

namespace App\Flipper\Stock\Requests;

use App\Flipper\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateStockRequest extends BaseFormRequest
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
