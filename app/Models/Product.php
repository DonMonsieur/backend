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
            'id as product_id',
            'product_name',
            'product_sku',
            'product_category_id',
            'product_description',
        ])->get();
    }
}
