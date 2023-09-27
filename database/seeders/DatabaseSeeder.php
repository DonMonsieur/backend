<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(50)->create();
        \App\Models\Category::factory(50)->create();
        \App\Models\Product::factory(50)->create();
        

        // Create a specific user
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Call other seeder classes if needed
        // $this->call([
        //     UsersTableSeeder::class,
        //     CategoriesTableSeeder::class,
        //     ProductsTableSeeder::class,
        // ]);
    }
}
