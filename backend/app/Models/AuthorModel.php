<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AuthorModel extends Model
{
    use HasFactory, HasUuids;

    protected $table="authors";
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $fillable = ['name'];


    public function books(): HasMany
    {
        return $this->hasMany(BookModel::class, 'author_id');
    }
}
