<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return
            $rules = [
                'product_name' => 'required|string|max:55|unique:products,product_name,' . $this->id,
                'product_sku' => 'required|string|max:255|unique:products,product_sku,' . $this->id,
                'product_description' => 'nullable|string|max:255',
                'product_category_id' => 'exists:categories,id',
            ];

        if ($this->hasFile('product_image')) {
            $rules['product_image'] = 'required|mimes:jpg,png,jpeg|max:20000';
        }

        return $rules;
    }
}
