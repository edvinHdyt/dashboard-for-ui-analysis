<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/user-management/get", [UserController::class, 'index'])
->name("user.get");


Route::post("/login", [AuthenticationController::class, 'index'])->name('login');
Route::post("/register", [AuthenticationController::class, 'store'])->name('login');
