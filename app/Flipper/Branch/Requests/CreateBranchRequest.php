<?php

namespace App\Flipper\Branch\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateBranchRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return ['name' => ['required','string','unique:branch'],
                'business_id' => ['required']
                ];
    }
}
