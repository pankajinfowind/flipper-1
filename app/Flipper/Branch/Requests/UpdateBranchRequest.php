<?php

namespace App\Filpper\Branch\Requests;

use App\Flipper\Base\BaseFormRequest;

class UpdateBranchRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return ['name' => ['required','string','unique:branch'] ];
    }
}
