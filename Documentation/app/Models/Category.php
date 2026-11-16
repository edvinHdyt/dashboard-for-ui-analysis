<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;

    protected $fillable = ['category'];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_categories', 'id_category', 'id_book')
            ->using(BookCategory::class)
            ->withPivot('id');
    }
}
