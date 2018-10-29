<?php

namespace App\Flipper\PosSessions\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreatePosSessionRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'session' => ['required','unique:pos_session'],
            'open' => ['required'],
            'branch_id' => ['required'],
        ];
    }
}
