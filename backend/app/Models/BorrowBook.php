<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BorrowBookModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'borrow_books';

    protected $fillable = ['id_book', 'id_user'];

    public function book(): BelongsTo
    {
        return $this->belongsTo(BookModel::class, 'id_book');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserModel::class, 'id_user');
    }
}
