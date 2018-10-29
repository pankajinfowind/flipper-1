<?php

namespace App\Flipper\Business\Requests;

use App\Flipper\Base\BaseFormRequest;

class CreateBusinessRequest extends BaseFormRequest
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
        return ['name' => ['required','string','unique:business'],
        'type' => ['required','string'],
        'address' => ['required','string'],
         'description' => ['required','string']
        ];
    }

     /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'name is required!',
            'type.required' => 'type is required!',
            'address.required' => 'address is required!',
            'description.required' => 'description is required!'
        ];
    }
    /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    public function filters()
    {
        return [
            'name' => 'trim|capitalize|escape'
        ];
    }
}

