<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/users')->group(function () {
    Route::get('/list', [UserController::class, 'getUsers']);
    Route::post('/create', [UserController::class, 'createUser']);
    Route::put('/update', [UserController::class, 'updateUser']);
    Route::delete('/delete', [UserController::class, 'deleteUser']);
});

Route::prefix('/products')->group(function () {
    Route::get('/list', [ProductController::class, 'getProduct']);
    Route::post('/create', [ProductController::class, 'createProduct']);
    Route::put('/update', [ProductController::class, 'updateProduct']);
    Route::delete('/delete', [ProductController::class, 'deleteProduct']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/list', [CategoryController::class, 'getCategories']);
    Route::post('/create', [CategoryController::class, 'createCategories']);
    Route::put('/update', [CategoryController::class, 'updateCategories']);
    Route::delete('/delete', [CategoryController::class, 'deleteCategories']);
});
