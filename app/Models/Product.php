<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_sku',
        'product_category_id',
        'product_description',
        'product_image',
    ];


    public static function getProductsData($perPage, $page, $sortBy = 'product_id', $sortDirection = 'asc', $sortCategory)
    {
        $query = self::select([
            'products.id as product_id',
            'products.product_name',
            'products.product_sku',
            'products.product_category_id',
            'products.product_description',
            'products.product_image',
            'categories.category_name',
        ])
            ->leftJoin('categories', 'products.product_category_id', '=', 'categories.id')
            ->orderBy($sortBy, $sortDirection);

        if ($sortCategory && $sortCategory !== "Show all categories") {
            $query->where('categories.category_name', $sortCategory);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public static function getProduct()
    {
        return self::select([
            'products.id as id',
            'products.product_name',
            'products.product_sku',
            'products.product_description',
            'products.product_image',
            'categories.category_name as product_category',
        ])
            ->leftJoin('categories', 'products.product_category_id', '=', 'categories.id')
            ->orderBy('products.created_at', 'desc')
            ->orderBy('products.updated_at', 'desc')
            ->get();
    }
}
