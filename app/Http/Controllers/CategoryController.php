<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{

    public function getCategories()
    {
        $categoryList = Category::getCategoriesWithUsernames();

        return response()->json([
            'status_code' => 200,
            'message' => 'OK',
            'data' => $categoryList
        ]);
    }

    public function createCategories(StoreCategoryRequest $request)
    {
        $validatedCategory = $request->validated();

        $category = Category::create($validatedCategory);

        return response()->json([
            'message' => 'Category created successfully',
        ], 201);
    }

    public function updateCategories(UpdateCategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update($request->validated());

        return response()->json([
            'message' => 'Category updated successfully',
        ], 201);
    }


    public function deleteCategories($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            'message' => 'Category deleted!'
        ]);
    }
}
