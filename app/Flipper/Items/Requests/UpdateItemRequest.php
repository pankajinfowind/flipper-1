<?php

namespace App\Flipper\Items\Requests;

use App\Flipper\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateItemRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'barcode' => ['required','unique:items'],
            'item' => ['required'],
            'units' => ['required'],
            'price' => ['required'],
            'sale_price' => ['required'],
            'category_id' => ['required'],
            'cover' => ['required', 'file', 'image:png,jpeg,jpg,gif']
        ];
    }
}
