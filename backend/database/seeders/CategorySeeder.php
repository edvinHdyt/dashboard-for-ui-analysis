<?php

namespace Database\Seeders;

use App\Models\CategoryModel;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Fiksi & Sastra',
                'description' => 'Novel, kumpulan cerpen, puisi, dan karya sastra klasik maupun kontemporer.',
            ],
            [
                'name' => 'Teknologi & Ilmu Komputer',
                'description' => 'Pemrograman, rekayasa perangkat lunak, kecerdasan buatan, jaringan, dan keamanan siber.',
            ],
            [
                'name' => 'Sains & Matematika',
                'description' => 'Fisika, kimia, biologi, astronomi, serta matematika murni dan terapan.',
            ],
            [
                'name' => 'Bisnis & Ekonomi',
                'description' => 'Manajemen, kewirausahaan, keuangan, akuntansi, dan pemasaran.',
            ],
            [
                'name' => 'Pengembangan Diri',
                'description' => 'Produktivitas, psikologi populer, kepemimpinan, dan keterampilan komunikasi.',
            ],
            [
                'name' => 'Sejarah & Budaya',
                'description' => 'Sejarah dunia, sejarah nusantara, antropologi, dan kajian kebudayaan.',
            ],
            [
                'name' => 'Filsafat & Psikologi',
                'description' => 'Pemikiran filsafat, etika, logika, dan ilmu perilaku manusia.',
            ],
            [
                'name' => 'Hukum & Politik',
                'description' => 'Ilmu hukum, tata negara, hubungan internasional, dan kebijakan publik.',
            ],
            [
                'name' => 'Seni & Desain',
                'description' => 'Desain grafis, arsitektur, fotografi, musik, dan seni rupa.',
            ],
            [
                'name' => 'Pendidikan & Referensi',
                'description' => 'Buku ajar, kamus, ensiklopedia, dan panduan metodologi penelitian.',
            ],
        ];

        foreach ($categories as $category) {
            CategoryModel::updateOrCreate(
                [
                    'category' => $category['name'],
                ]
            );
        }
    }
}
