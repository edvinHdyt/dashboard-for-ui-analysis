<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BookCategory extends Pivot
{
    use HasUuids;

    protected $table = 'book_categories';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['id_book', 'id_category'];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'id_book');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}
