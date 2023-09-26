<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUsers()
    {
        $userList = User::all();

        return response()->json([
            'data' => $userList,
            'message' => 'OK',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createUser(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUser(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUser(User $user)
    {
        //
    }
}
