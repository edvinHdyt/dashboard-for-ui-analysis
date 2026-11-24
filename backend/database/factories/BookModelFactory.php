<?php

namespace Database\Factories;

use App\Models\AuthorModel;
use App\Models\BookModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BookModel>
 */
class BookModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'isbn' => fake()->unique()->isbn13(),
            'title' => Str::limit(fake()->sentence(3), 100, ''),
            'description' => fake()->paragraph(3),
            'author_id' => AuthorModelFactory::inRandomOrder()->value('id') ?? AuthorModel::factory(),
            'publisher' => Str::limit(fake()->company(), 100, ''),
            'year' => fake()->numberBetween(2000, 2026),
            'cover' => null,
            'status' => fake()->randomElement(['Tersedia', 'Dipinjam']),
        ];
    }
}
