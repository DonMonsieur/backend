<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            User::create([
                'username' => 'user' . $i,
                'first_name' => 'John' . $i,
                'last_name' => 'Doe' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => Hash::make('password' . $i),
            ]);
        }
    }
}
