<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory, HasUuids;

    public const STATUS_TERSEDIA = 'Tersedia';
    public const STATUS_DIPINJAM = 'Dipinjam';

    protected $fillable = [
        'isbn',
        'title',
        'description',
        'author_id',
        'publisher',
        'year',
        'cover',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'book_categories', 'id_book', 'id_category')
            ->using(BookCategory::class)
            ->withPivot('id');
    }

    public function borrowBooks(): HasMany
    {
        return $this->hasMany(BorrowBook::class, 'id_book');
    }
}
