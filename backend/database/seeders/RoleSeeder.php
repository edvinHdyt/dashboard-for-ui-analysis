<?php

namespace Database\Seeders;

use App\Models\RoleModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Super Admin', 'Admin', "Member"];

        foreach ($roles as $role) {
            RoleModel::firstOrCreate(['role' => $role]);
        }
    }
}
