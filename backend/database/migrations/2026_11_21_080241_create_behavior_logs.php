<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('behavior_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('id_user', 255);
            $table->double('error_rate');
            $table->bigInteger('feature_usage');
            $table->bigInteger('idle_time');
            $table->bigInteger('task_time');
            $table->bigInteger('device_screen');
            $table->double('latency_rate');
            $table->timestamps();
            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('behavior_logs');
    }
};
