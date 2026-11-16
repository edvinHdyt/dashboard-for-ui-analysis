<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id', 255)->primary();
            $table->string('username', 50);
            $table->string('email', 50)->unique();
            $table->string('no_hp', 12);
            $table->string('password', 255);
            $table->string('profil_pict', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
