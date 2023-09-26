<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getCategories()
    {
        $categoryList = Category::all();

        return response()->json([
            'message' => 'OK',
            'data' => $categoryList
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createCategories(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateCategories(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteCategories(Category $category)
    {
        //
    }
}
