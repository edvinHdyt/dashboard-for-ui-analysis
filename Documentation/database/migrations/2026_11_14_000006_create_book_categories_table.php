<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_categories', function (Blueprint $table) {
            $table->string('id', 255)->primary();
            $table->string('id_book', 255);
            $table->string('id_category', 255);

            $table->foreign('id_book')->references('id')->on('books')->cascadeOnDelete();
            $table->foreign('id_category')->references('id')->on('categories')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_categories');
    }
};
