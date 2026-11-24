<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BehaviorLogsController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
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
    Route::delete("/author/delete/{id}", [AuthorController::class, 'destroy']);
    Route::delete("/book/delete/{id}", [BookController::class, 'destroy']);
    Route::delete("/category/delete/{id}", [CategoryController::class, 'destroy']);
    Route::delete("/user-management/delete/{id}", [UserController::class, 'destroy']);
    Route::get("/author/get", [AuthorController::class, 'index']);
    Route::get("/author/get/{id}", [AuthorController::class, 'getOne']);
    Route::get("/book/get", [BookController::class, 'index']);
    Route::get("/book/get/{id}", [BookController::class, 'getOne']);
    Route::get("/category/get", [CategoryController::class, 'index']);
    Route::get("/category/get/{id}", [CategoryController::class, 'getOne']);
    Route::get("/ping", function (){return response()->json(["ok"]);});
    Route::get("/role/get", [RoleController::class, 'index']);
    Route::get("/user-management/get", [UserController::class, 'index']);
    Route::get("/user-management/get/{id}", [UserController::class, 'getOne']);
    Route::patch("/author/update/{id}", [AuthorController::class, 'update']);
    Route::patch("/book/update/{id}", [BookController::class, 'update']);
    Route::patch("/category/update/{id}", [CategoryController::class, 'update']);
    Route::patch("/user-management/update/{id}", [UserController::class, 'update']);
    Route::patch("/user-management/password/reset/{id}", [UserController::class, 'resetPassword']);
    Route::post("/author/create", [AuthorController::class, 'store']);
    Route::post("/category/create", [CategoryController::class, 'store']);
    Route::post("/book/create", [BookController::class, 'store']);
    Route::post('/logout', [AuthenticationController::class, 'destroy']);
    Route::post("/user-management/create", [UserController::class, 'store']);
    Route::post("/behavior-logs/create", [BehaviorLogsController::class, 'store']);
});


