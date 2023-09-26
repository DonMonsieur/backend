<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'product_sku',
        'product_category_id',
        'product_description',
        'product_image',
    ];


    public static function getProductsData()
    {
        return self::select([
            'products.id as product_id',
            'products.product_name',
            'products.product_sku',
            'products.product_category_id',
            'products.product_description',
            'categories.category_name',
        ])
            ->leftJoin('categories', 'products.product_category_id', '=', 'categories.id')
            ->get();
    }
}
