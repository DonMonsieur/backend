<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            Product::create([
                'product_name' => 'Product ' . $i,
                'product_sku' => 'SKU' . $i,
                'product_category_id' => rand(1, 20),
                'product_description' => 'Description for Product ' . $i,
            ]);
        }
    }
}
