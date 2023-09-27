<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $userId = $user ? $user->id : null;

        return [
            'category_name' => $this->faker->unique()->word(),
            'category_description' => $this->faker->unique()->sentence(),
            'product_manager_id' => $userId,
        ];
    }
}
