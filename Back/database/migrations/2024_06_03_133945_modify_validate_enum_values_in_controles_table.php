<?php

use App\Models\Pole;
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
        Schema::table('controles', function (Blueprint $table) {
            $table->string('etat')->nullable();
            $table->foreignIdFor(Pole::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('controles', function (Blueprint $table) {
            //
        });
    }
};
