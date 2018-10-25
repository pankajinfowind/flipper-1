<?php

namespace App\Flipper\AttributeValues\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateAttributeValueRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'value' => ['required']
        ];
    }
}
