<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->string('id', 255)->primary();
            $table->string('id_user', 255);
            $table->string('id_role', 255);

            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('id_role')->references('id')->on('roles')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
};
