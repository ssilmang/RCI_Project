<?php
use App\Models\User;
// use App\Models\Controle;
use App\Models\Service;
use App\Models\Activite;
use App\Models\Direction;
use App\Models\Departement;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('controles', function (Blueprint $table) {
            $table->id();
            $table->string('objectif');
            $table->string('risque_couvert');
            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Activite::class)->constrained();
            $table->foreignIdFor(Service::class)->constrained();
            $table->foreignIdFor(Departement::class)->constrained();
            $table->foreignIdFor(Direction::class)->constrained();
            $table->string('periodicite');
            $table->string('exhaustivite');
            $table->string('preuve');
            $table->string('nom');
            $table->string('code');
            $table->string('commentaire');
            $table->string('description');
            $table->timestamp('date_ajout')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->enum('validate',['true','fals']);
            $table->timestamp('deleted_at')->nullable();
            $table->binary('fichier')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('controles');
        Schema::dropIfExists('deleted_at');
        Schema::dropIfExists('fichier');
    }
};
