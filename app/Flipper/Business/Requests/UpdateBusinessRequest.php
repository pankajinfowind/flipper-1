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
        return ['name' => ['required|string|min:1'],
                'type' => ['required|string|min:1'],
                'address' => ['required|string|min:1'],
                'description' => ['required|string|min:1']
                ];
    }
}
