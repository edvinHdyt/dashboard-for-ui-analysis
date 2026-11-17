<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Illuminate\Support\Str;

class BookModel extends Model
{
    use HasFactory, HasUuids;

    public const STATUS_TERSEDIA = 'Tersedia';
    public const STATUS_DIPINJAM = 'Dipinjam';

    protected $table = "books";
    protected $primaryKey = 'id';
    public $incrementing = false;

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
        return $this->belongsTo(AuthorModel::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(CategoryModel::class, 'book_categories', 'id_book', 'id_category')
            ->using(BookCategoryModel::class)
            ->withPivot('id');
    }

    public function borrowBooks(): HasMany
    {
        return $this->hasMany(BorrowBookModel::class, 'id_book');
    }

    public static function createWithCategories(array $data, array $categoryIds): self
{
        $categoryIds = array_values(array_unique($categoryIds));

        if (count($categoryIds) < 1) {
            throw new InvalidArgumentException('Buku harus memiliki minimal 1 kategori.');
        }

        return DB::transaction(function () use ($data, $categoryIds) {
            $book = self::create($data);
            // format: [category_id => ['id' => uuid pivot]]
            $pivotData = [];
            foreach ($categoryIds as $categoryId) {
                $pivotData[$categoryId] = ['id' => (string) Str::uuid()];
            }

            $book->categories()->attach($pivotData);

            return $book->load(['author', 'categories']);
        });
    }

    public function updateWithCategories(array $data, ?array $categoryIds = null): self
    {
        if ($categoryIds !== null) {
            $categoryIds = array_values(array_unique($categoryIds));

            if (count($categoryIds) < 1) {
                throw new InvalidArgumentException('Buku harus memiliki minimal 1 kategori.');
            }
        }

        return DB::transaction(function () use ($data, $categoryIds) {
            $this->update($data);

            // null = kategori tidak diubah
            if ($categoryIds !== null) {
                $current  = $this->categories()->pluck('categories.id')->all();
                $toDetach = array_diff($current, $categoryIds);
                $toAttach = array_diff($categoryIds, $current);

                if ($toDetach) {
                    $this->categories()->detach($toDetach);
                }

                if ($toAttach) {
                    $pivotData = [];
                    foreach ($toAttach as $categoryId) {
                        $pivotData[$categoryId] = ['id' => (string) Str::uuid()];
                    }
                    $this->categories()->attach($pivotData);
                }
            }

            return $this->load(['author', 'categories']);
        });
    }
}
