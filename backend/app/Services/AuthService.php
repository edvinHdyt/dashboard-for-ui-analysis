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
            'password' => 'required|string'
        ]);

        $role = RoleModel::where("role", 'Member')->get()->first();

        $passHash = Hash::make($request->password);

        $user = UserModel::create([
            'username' => $request->username,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'password' => $passHash,
        ]);

        UserRoleModel::create([
            'id_role' => $role->id,
            'id_user' => $user->id
        ]);


    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = UserModel::where('email', $request->email)->get()->first();

        if(Hash::check($request->password, $user->password)){
            $role = $user->roles->pluck('role')->first();

            $userData = [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $role
            ];

            return $userData;
        } else {
            throw new IllogicalValuesException('Credential tidak sesuai');
        }
    }
}
