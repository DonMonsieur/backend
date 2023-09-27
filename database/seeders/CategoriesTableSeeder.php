<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            Category::create([
                'category_name' => 'Category ' . $i,
                'product_manager' => rand(1, 20),
                'category_description' => 'Description for Category ' . $i,
            ]);
        }
    }
}
