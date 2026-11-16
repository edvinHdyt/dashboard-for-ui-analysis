<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('borrow_books', function (Blueprint $table) {
            $table->string('id', 255)->primary();
            $table->string('id_book', 255);
            $table->string('id_user', 255);
            $table->timestamps();

            $table->foreign('id_book')->references('id')->on('books')->cascadeOnDelete();
            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('borrow_books');
    }
};
