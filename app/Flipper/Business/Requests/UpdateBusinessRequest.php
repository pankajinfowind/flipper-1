<?php

namespace App\Business\Roles\Requests;

use App\Flipper\Base\BaseFormRequest;

class UpdateBusinessRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return ['name' => ['required','string','unique:business'],
        'type' => ['required','string'],
        'address' => ['required','string'],
         'description' => ['required','string']
        ];
    }
}
