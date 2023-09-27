<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = Category::inRandomOrder()->first();
        $categoryId = $category ? $category->id : null;

        return [
            'product_name' => $this->faker->unique()->name(),
            'product_sku' => $this->faker->unique()->randomNumber(),
            'product_category_id' => $categoryId,
            'product_description' => $this->faker->unique()->sentence(),
            'product_image' => $this->faker->imageUrl(),
        ];
    }
}
