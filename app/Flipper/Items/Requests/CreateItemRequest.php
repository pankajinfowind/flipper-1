<?php

namespace App\Flipper\Items\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateItemRequest extends BaseFormRequest
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
            'business_id' => ['required'],
            'cover' => ['required', 'file', 'image:png,jpeg,jpg,gif']
        ];
    }
}
