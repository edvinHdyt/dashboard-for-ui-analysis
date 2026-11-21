<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct(protected AuthService $authService)
    {}

    public function index()
    {
        $users = UserModel::with("roles")->get();

        $userData = [];

        foreach ($users as $key => $val) {
            $userData[$key] = [
                'id' => $val->id,
                'username' => $val->username,
                'email' => $val->email,
                'no_telpon' => $val->no_hp,
                'role' => $val->roles[0]->role
            ];
        }

        return response()->json([
            'data' => $userData
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_role' => "required|string"
        ]);

        $this->authService->store($request);

        return response()->json([
            'message' => "Tambah user berhasil!"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {

        $user = UserModel::findorFail($id);
        $role = $user->roles()->get();

        return response()->json([
            'data' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'no_hp' => $user->no_hp,
                'roles' => [
                    "id" => $role[0]->id,
                    "role" => $role[0]->role,
                ]
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = UserModel::findOrFail($id);

        $validate = $request->validate([
            'username' => 'required|string|max:50',
            'email' => 'required|string|email|max:100|unique:users,email,'.$user->id,
            'no_hp' => 'string',
            'id_role' => 'required|string',
        ]);

        $user->update($validate);

        $user_role["id_user"] = $id;
        $user_role["id_role"] = $validate["id_role"];
        $user->roles()->update($user_role);

        return response()->json([
            'message' => 'Update user berhasil!'
        ]);
    }

    public function resetPassword(Request $request, string $id){
        $user = UserModel::findorFail($id);

        $validated = $request->validate([
            "password"=>"required|string|min:3"
        ]);

        $validated["password"] = Hash::make($validated["password"]);

        $user->update($validated);

        return response()->json([
            "message" => "Password telah direset!"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = UserModel::findorFail($id);
        $user->delete();

        return response()->json([
            'message' => "Delete user berhasil!"
        ]);
    }
}
