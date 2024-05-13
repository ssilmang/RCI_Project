<?php
use App\Models\User;
use App\Models\Controle;
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
        Schema::create('pilotages', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Controle::class)->constrained();
            $table->string('objectif');
            $table->string('risque_couvert');
            $table->foreignIdFor(User::class)->constrained();
            $table->string('periodicite');
            $table->string('exhaustivite');
            $table->string('preuve');
            // $table->string('fichier');
            $table->enum('fichier',[0,1]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pilotages');
    }
};
