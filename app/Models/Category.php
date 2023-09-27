<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'category_name',
        'category_description',
        'product_manager',
    ];

    public static function getCategoriesWithUsernames()
    {
        return self::select('categories.id', 'categories.category_name', 'categories.category_description', 'users.username as product_manager')
            ->leftJoin('users', 'categories.product_manager', '=', 'users.id')
            ->get();
    }
}
