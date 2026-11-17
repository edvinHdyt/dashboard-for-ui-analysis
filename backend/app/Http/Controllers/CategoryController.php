<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryModel;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = CategoryModel::get();

        return [
            'data' => $categories
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "category" => 'required|string|max:20'
        ]);

        CategoryModel::create([
            'category' => $request->category
        ]);

        return [
            'message' => 'Tambah category berhasil!'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {
        $category = CategoryModel::findorFail($id);

        return [
            'data' => $category
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->merge(['id' => $request->id]);
        $request->validate([
            'id' => 'required|string',
            'category' => 'required|string'
        ]);

        $category = CategoryModel::findorFail($request->id);

        $category->update(['category' => $request->category]);

        return[
            'message' => 'Berhasil update category!'
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = CategoryModel::findorFail($id);
        $category->delete();

        return[
            'message' => "Berhasil delete category!"
        ];
    }
}
