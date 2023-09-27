<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProduct(Request $request)
    {
        $page = $request->query('page');
        $perPage = $request->query('perPage');
        $sortBy = $request->query('sortBy', 'product_id');
        $sortDirection = $request->query('sortDirection', 'asc');
        $sortCategory = $request->query('sortCategory');

        $productList = Product::getProductsData($perPage, $page, $sortBy, $sortDirection, $sortCategory);

        $meta = [
            'pagination' => [
                'total' => $productList->total(),
                'count' => $productList->count(),
                'per_page' => $productList->perPage(),
                'current_page' => $productList->currentPage(),
                'total_pages' => $productList->lastPage(),
                'links' => [
                    'next' => $productList->nextPageUrl(),
                ],
            ],
        ];

        return response()->json([
            'status_code' => 200,
            'message' => 'OK',
            'data' => $productList->items(),
            'meta' => $meta,
        ], 200);
    }

    public function productData()
    {
        $data = Product::getProduct();

        return response()->json([
            'status_code' => 200,
            'message' => 'OK',
            'data' => $data,
        ], 200);
    }


    public function createProduct(StoreProductRequest $request)
    {

        $validatedProduct = $request->validated();

        $image = $request->file('product_image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);

        $validatedProduct['product_image'] = 'images/' . $imageName;


        $product = Product::create($validatedProduct);

        return response()->json([
            'status_code' => 201,
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    public function updateProduct(UpdateProductRequest $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validatedProduct = $request->validated();

            if ($request->hasFile('product_image')) {
                $oldImagePath = public_path($product->product_image);

                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }

                $image = $request->file('product_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $validatedProduct['product_image'] = 'images/' . $imageName;
            }

            $product->update($validatedProduct);

            return response()->json([
                'status_code' => 200,
                'message' => 'Product updated successfully',
                'product' => $product,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);

        if (!is_null($product->product_image)) {
            $imagePath = public_path($product->product_image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $product->delete();

        return response()->json([
            'status_code' => 200,
            'message' => 'Product deleted successfully',
            'data' => $product
        ], 200);
    }
}
