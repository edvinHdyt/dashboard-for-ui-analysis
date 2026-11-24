<?php

namespace Database\Seeders;

use App\Models\AuthorModel;
use App\Models\BookModel;
use App\Models\CategoryModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua ID author yang ada; buat 5 author dummy jika tabel masih kosong
        $authorIds = AuthorModel::pluck('id');
        if ($authorIds->isEmpty()) {
            $authorIds = AuthorModel::factory(5)->create()->pluck('id');
        }

        $categoryIds = CategoryModel::pluck('id');

        $books = [
            [
                'isbn' => '978-979-3062-79-2',
                'title' => 'Laskar Pelangi',
                'description' => 'Kisah perjuangan anak-anak Belitung dalam menempuh pendidikan di tengah keterbatasan.',
                'publisher' => 'Bentang Pustaka',
                'year' => 2005,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-0-13-235088-4',
                'title' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
                'description' => 'Panduan praktis menulis kode yang bersih, terstruktur, dan mudah dipelihara.',
                'publisher' => 'Prentice Hall',
                'year' => 2008,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-0-553-38016-3',
                'title' => 'A Brief History of Time',
                'description' => 'Penjelasan populer mengenai kosmologi, lubang hitam, dan asal-usul alam semesta.',
                'publisher' => 'Bantam Books',
                'year' => 1998,
                'status' => 'Dipinjam',
            ],
            [
                'isbn' => '978-0-06-231609-7',
                'title' => 'Sapiens: Riwayat Singkat Umat Manusia',
                'description' => 'Tinjauan sejarah evolusi manusia dari masa purba hingga revolusi ilmiah modern.',
                'publisher' => 'Kepustakaan Populer Gramedia',
                'year' => 2017,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-0-7352-1129-2',
                'title' => 'Atomic Habits',
                'description' => 'Strategi membangun kebiasaan baik dan menghilangkan kebiasaan buruk melalui perubahan kecil.',
                'publisher' => 'Gramedia Pustaka Utama',
                'year' => 2019,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-0-374-53355-7',
                'title' => 'Thinking, Fast and Slow',
                'description' => 'Eksplorasi dua sistem berpikir manusia yang memengaruhi pengambilan keputusan sehari-hari.',
                'publisher' => 'Farrar, Straus and Giroux',
                'year' => 2011,
                'status' => 'Dipinjam',
            ],
            [
                'isbn' => '978-1-59184-778-6',
                'title' => 'The Lean Startup',
                'description' => 'Metodologi pengembangan produk dan bisnis rintisan berbasis eksperimen terukur.',
                'publisher' => 'Crown Business',
                'year' => 2011,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-0-465-05065-9',
                'title' => 'The Design of Everyday Things',
                'description' => 'Prinsip dasar desain antarmuka dan interaksi antara manusia dengan objek di sekitarnya.',
                'publisher' => 'Basic Books',
                'year' => 2013,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-979-433-832-2',
                'title' => 'Filosofi Teras',
                'description' => 'Penerapan filsafat Stoisisme kuno untuk mengatasi kecemasan mental di era modern.',
                'publisher' => 'Kompas Penerbit Buku',
                'year' => 2018,
                'status' => 'Tersedia',
            ],
            [
                'isbn' => '978-979-769-123-3',
                'title' => 'Pengantar Ilmu Hukum dan Tata Negara',
                'description' => 'Buku referensi dasar mengenai konsep hukum, konstitusi, dan sistem ketatanegaraan.',
                'publisher' => 'Rajawali Pers',
                'year' => 2021,
                'status' => 'Tersedia',
            ],
        ];

        foreach ($books as $item) {
            $book = BookModel::firstOrCreate(
                ['isbn' => $item['isbn']],
                [
                    'id' => (string) Str::uuid(),
                    'title' => $item['title'],
                    'description' => $item['description'],
                    'author_id' => $authorIds->random(),
                    'publisher' => $item['publisher'],
                    'year' => $item['year'],
                    'cover' => null,
                    'status' => $item['status'],
                ]
            );

            // Opsional: hubungkan 1-2 kategori acak jika model Book memiliki relasi categories()
            if ($categoryIds->isNotEmpty() && method_exists($book, 'categories')) {
                $book->categories()->syncWithoutDetaching(
                    $categoryIds->random(min(2, $categoryIds->count()))->toArray()
                );
            }
        }
    }
}
