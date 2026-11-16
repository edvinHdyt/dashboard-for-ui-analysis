<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{

    public function __construct(protected AuthService $authService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = $this->authService->login($request);

        return response()->json([
            'data'=> $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authService->store($request);

        $data = $this->authService->login($request);

        return response()->json([
            'message' => 'Register Berhasil!',
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function checkToken(Request $request)
    {
        $user = $request->user()->load('roles');

        return response()->json([
            'status' => 1,
            'message' => 'Token valid.',
            'data' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->roles->first()?->role,
            ],
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $this->authService->logout($request);

        return[
            'message' => "Berhasil logout!"
        ];
    }
}
