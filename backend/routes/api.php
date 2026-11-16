<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RefreshSanctumToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/user-management/get", [UserController::class, 'index'])
->name("user.get");


Route::post("/login", [AuthenticationController::class, 'index'])->name('login');
Route::post("/register", [AuthenticationController::class, 'store'])->name('login');

Route::middleware(['auth:sanctum', RefreshSanctumToken::class])->group(function (){
    Route::get("/me", [AuthenticationController::class, 'checkToken']);
    Route::get("/author/get", [AuthorController::class, 'index']);
    Route::get("/author/get/{id}", [AuthorController::class, 'getOne']);
    Route::post('/logout', [AuthenticationController::class, 'destroy']);
    Route::post("/author/create", [AuthorController::class, 'store']);
    Route::patch("/author/update/{id}", [AuthorController::class, 'update']);
    Route::delete("/author/delete/{id}", [AuthorController::class, 'destroy']);
});


Route::get("/ping", fn() => 'ok');
