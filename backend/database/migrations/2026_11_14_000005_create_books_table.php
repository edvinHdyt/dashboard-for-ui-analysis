<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('isbn', 50)->unique();
            $table->string('title', 100);
            $table->text('description')->nullable();
            $table->string('author_id', 255);
            $table->string('publisher', 100);
            $table->unsignedSmallInteger('year');
            $table->string('cover', 255)->nullable();
            $table->enum('status', ['Tersedia', 'Dipinjam'])->default('Tersedia');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('authors')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
