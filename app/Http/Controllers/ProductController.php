<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getProduct()
    {
        $productList = Product::getProductsData();

        return response()->json([
            'data' => $productList,
            'message' => 'OK'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createProduct(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProduct(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteProduct(Product $product)
    {
        //
    }
}
