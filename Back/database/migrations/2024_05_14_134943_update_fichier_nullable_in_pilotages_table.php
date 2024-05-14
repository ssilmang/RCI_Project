<?php

use App\Models\Activite;
use App\Models\Departement;
use App\Models\Direction;
use App\Models\Pole;
use App\Models\Service;
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
        Schema::table('pilotages', function (Blueprint $table) {
            $table->foreignIdFor(Direction::class)->constrained();
            $table->foreignIdFor(Departement::class)->constrained();
            $table->foreignIdFor(Service::class)->constrained();
            $table->foreignIdFor(Activite::class)->constrained();
            $table->foreignIdFor(Pole::class)->constrained();
            $table->string('code');
            $table->boolean('etat')->default(false);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pilotages', function (Blueprint $table) {

        });
    }
};
