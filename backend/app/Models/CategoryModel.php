<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CategoryModel extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;

    protected $fillable = ['category'];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(BookModel::class, 'book_categories', 'id_category', 'id_book')
            ->using(BookCategoryModel::class)
            ->withPivot('id');
    }
}
