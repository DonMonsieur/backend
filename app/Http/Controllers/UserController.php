<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    public function getUsers()
    {
        $userList = User::orderBy('first_name', 'ASC')
            ->orderBy('last_name', 'ASC')
            ->get();;

        return response()->json([
            'data' => $userList,
            'message' => 'OK',
        ], 200);
    }

    public function createUser(StoreUserRequest $request)
    {
        try {
            $userData = $request->validated();
            $userData['password'] = bcrypt($userData['password']);

            $user = User::create($userData);

            return response()->json([
                'message' => 'User created successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the user.'], 500);
        }
    }

    public function updateUser(UpdateUserRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $userData = $request->validated();

            $user->update($userData);

            return response()->json([
                'message' => 'User updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the user.'], 500);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);

            $user->delete($user);

            return response()->json([
                'message' => 'User deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the user.'], 500);
        }
    }

    public function getProductManager()
    {
        $data = User::getManager();

        return response()->json([
            'status_code' => 200,
            'message' => 'OK',
            'data' => $data,
        ], 200);
    }
}
