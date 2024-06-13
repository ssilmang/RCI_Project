<?php

use App\Models\Type_Controle;
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
        Schema::create('data', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom_controle');
            $table->string('code');
            $table->string('objectif');
            $table->string('descriptif');
            $table->unsignedBigInteger('type')->nullable();
            $table->foreign('type')
                ->references('id')
                ->on('type_controles')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data');
    }
};
