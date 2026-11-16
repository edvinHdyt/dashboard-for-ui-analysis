<?php

namespace App\Http\Controllers;

use App\Models\AuthorModel;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $authors = AuthorModel::with('books')->get();

        $authorData = [];
        foreach ($authors as $key => $val) {
            $authorData[$key]['id'] = $val->id;
            $authorData[$key]['name'] = $val->name;
            $authorData[$key]['totalBooks'] = $val->books()->count();
        }

        return [
            "data" => $authorData
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => "required|string|max:50"
        ]);

        AuthorModel::create([
            'name' => $request->name
        ]);

        return [
            "message" => "Tambah auhtor berhasil!"
        ];
    }

    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {
        $author = AuthorModel::findorFail($id);
        $auhtorData = [
            'id' => $author->id,
            'name' => $author->name
        ];

        return [
            'data'=>$auhtorData
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'id' => 'required|string',
            'name' => 'required|string|max:50'
        ]);

        AuthorModel::where('id', $request->id)
        ->update(['name'=>$request->name]);


        return [
            'message' => 'Update berhasil!'
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $authors = AuthorModel::findorfail($id);

        $authors->delete();

        return [
            'message' => 'Delete berhasil!'
        ];
    }
}
