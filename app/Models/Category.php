<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'category_description',
        'product_manager',
    ];

    public static function getCategoriesWithUsernames()
    {
        return self::select('categories.id', 'categories.category_name', 'categories.category_description', 'users.username as product_manager')
            ->leftJoin('users', 'categories.product_manager', '=', 'users.id')
            ->orderBy('categories.category_name', 'asc')
            ->get();
    }

    public static function getProductCategory()
    {
        return self::select('id', 'category_name')->get();
    }
}
