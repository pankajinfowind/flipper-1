<?php

namespace App\Flipper\Business\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateBusinessRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return ['name' => ['required','string'],
                'type' => ['required','string'],
                'address' => ['required','string'],
                 'description' => ['required','string']
                ];
    }
}
