<?php

namespace Database\Seeders;

use App\Models\RoleModel;
use App\Models\UserModel;
use App\Models\UserRoleModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            AuthorSeeder::class,
            BookSeeder::class,
        ]);

        $user = UserModel::factory()->create([
            'username' => 'John Su',
            'email' => 'su@gmail.com',
            'no_hp' => '02893716723',
            'password' => Hash::make('123')
        ]);

        $role = RoleModel::where('role', 'Super Admin')->get()->first();
        UserRoleModel::create([
            'id_user' => $user->id,
            'id_role' => $role->id
        ]);
    }
}
