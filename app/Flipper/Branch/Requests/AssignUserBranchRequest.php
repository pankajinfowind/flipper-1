<?php

namespace App\Flipper\Branch\Requests;

use App\Flipper\Base\BaseFormRequest;

class AssignUserBranchRequest extends BaseFormRequest
{

     /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return ['branch_id' => ['required'],
                'user_id' => ['required']];
    }

     /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'branch_id.required' => 'branch_id is required!',
            'user_id.required' => 'user_id is required!'
        ];
    }

}
