<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
        return [
            'product_image' => 'required|mimes:jpg,png,jpeg|max:20000',
            'product_name' => 'required|string|max:55|unique:products,product_name',
            'product_sku' => 'required|string|max:255|unique:products,product_sku',
            'product_description' => 'nullable|string|max:255',
            'product_category_id' => 'required|exists:categories,id',

        ];
    }
}
