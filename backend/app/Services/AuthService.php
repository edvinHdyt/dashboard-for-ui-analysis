<?php

namespace App\Services;

use App\Models\RoleModel;
use App\Models\UserModel;
use App\Models\UserRoleModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use SebastianBergmann\LinesOfCode\IllogicalValuesException;

class AuthService
{
    public function store(Request $request):void{
        $request->validate([
            'username' => 'required|string|max:50',
            'email' => 'required|string|email|max:100|unique:users,email',
            'no_hp' => 'string',
            'password' => 'required|string|min:3'
        ]);

        if (!isset($request->id_role)){
            $role = RoleModel::where("role", 'Member')->get()->first();
            $role = $role->id;
        } else {
            $role = $request->id_role;
        }

        $passHash = Hash::make($request->password);

        $user = UserModel::create([
            'username' => $request->username,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'password' => $passHash,
        ]);

        UserRoleModel::create([
            'id_role' => $role,
            'id_user' => $user->id
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = UserModel::where('email', $request->email)->get()->first();

        if($user != null && Hash::check($request->password, $user->password)){
            $role = $user->roles->pluck('role')->first();
            $token = $user->createToken('auth_token')->plainTextToken;

            $userData = [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $role
            ];

            return [
                'user' => $userData,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ];
        } else {
            throw new IllogicalValuesException('Credential tidak sesuai');
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'Berhasil logout!'
        ];
    }
}
