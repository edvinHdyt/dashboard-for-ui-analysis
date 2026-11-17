<?php

namespace App\Http\Controllers;

use App\Models\BookModel;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function __construct(protected BookService $bookService)
    {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = BookModel::with(['categories', 'author'])->get();
        $bookDatas = [];
        foreach ($books as $key => $val) {
            $bookDatas[$key] = [
                'id' => $val->id,
                "isbn" => $val->isbn,
                "title" => $val->title,
                "publisher" => $val->publisher,
                "status" => $val->status,
                "year"=> $val->year,
                "author" => $val->author->name
            ];
        }

        return [
            "data" => $bookDatas
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->bookService->createBook($request);

        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function getOne(string $id)
    {
        $books = BookModel::findorFail($id);
        $books = $books->with(["author", "categories"])->get();
        $bookDatas = [];
        foreach ($books as $key => $val) {
            $bookDatas = [
                "id" => $val->id,
                "isbn" => $val->isbn,
                "title" => $val->title,
                "description" => $val->description,
                "publisher" => $val->publisher,
                "status" => $val->status,
                "year"=> $val->year,
                "author" => [
                    'id' => $val->author->id,
                    'name' => $val->author->name
                ]
            ];

            $categories = $val->categories;

            foreach ($categories as $categoryKey => $category) {
                $bookDatas['categories'][$categoryKey] = [
                    "id" => $category->id,
                    "category" => $category->category
                ];
            }
        }


        return [
            'data' => $bookDatas
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->merge(['id' => $id]);

        $data = $this->bookService->update($request);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        BookModel::findorFail($id)->delete();

        return response()->json([
            'message' => "Buku berhasil dihapus"
        ]);
    }
}
