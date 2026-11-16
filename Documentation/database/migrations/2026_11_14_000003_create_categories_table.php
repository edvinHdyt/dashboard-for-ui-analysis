<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->string('id', 255)->primary();
            $table->string('category', 40);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
