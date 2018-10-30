<?php

namespace App\Flipper\Categories\Requests;

use App\Flipper\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends BaseFormRequest
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
        return [
            'name' => ['required', Rule::unique('categories')->ignore(request()->segment(3))]
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
           'name.required' => 'name is required!'
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
