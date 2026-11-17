<?php

namespace App\Services;

use App\Models\BookModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Throwable;

class BookService
{
    public function createBook(Request $request){
        $validated = $request->validate([
            'isbn'           => ['required', 'string', 'max:50', 'unique:books,isbn'],
            'title'          => ['required', 'string', 'max:100'],
            'description'    => ['nullable', 'string'],
            'author_id'      => ['required', 'string', 'exists:authors,id'],
            'publisher'      => ['required', 'string', 'max:100'],
            'year'           => ['required', 'integer', 'between:1000,' . date('Y')],
            'cover'          => ['nullable', 'image', 'max:2048'],
            'status'         => ['nullable', Rule::in([BookModel::STATUS_TERSEDIA, BookModel::STATUS_DIPINJAM])],
            'category_ids'   => ['required', 'array', 'min:1'],
            'category_ids.*' => ['string', 'distinct', 'exists:categories,id'],
        ]);

        $categoryIds = $validated['category_ids'];
        unset($validated['category_ids']);

        $validated['status'] = $validated['status'] ?? BookModel::STATUS_TERSEDIA;

        try {
            BookModel::createWithCategories($validated, $categoryIds);
        } catch (Throwable $e) {
            throw $e;
        }

        return response()->json([
            'message' => 'Buku berhasil ditambahkan',
        ], 201);
    }

    public function update(Request $request){
        $book = BookModel::findOrFail($request->id);

        $validated = $request->validate([
            'isbn'           => ['required', 'string', 'max:50', Rule::unique('books', 'isbn')->ignore($book->id)],
            'title'          => ['required', 'string', 'max:100'],
            'description'    => ['nullable', 'string'],
            'author_id'      => ['required', 'string', 'exists:authors,id'],
            'publisher'      => ['required', 'string', 'max:100'],
            'year'           => ['required', 'integer', 'between:1000,' . date('Y')],
            'cover'          => ['nullable', 'image', 'max:2048'],
            'status'         => ['nullable', Rule::in([BookModel::STATUS_TERSEDIA, BookModel::STATUS_DIPINJAM])],
            'category_ids'   => ['sometimes', 'required', 'array', 'min:1'],
            'category_ids.*' => ['string', 'distinct', 'exists:categories,id'],
        ]);

        $categoryIds = $validated['category_ids'] ?? null;
        unset($validated['category_ids']);

        try {
            $book = $book->updateWithCategories($validated, $categoryIds);
        } catch (Throwable $e) {
            throw $e;
        }

        return [
            'message' => 'Buku berhasil diperbarui'
        ];
    }
}
