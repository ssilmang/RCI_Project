<?php
use App\Models\Direction;
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
        Schema::create('departements', function (Blueprint $table) {
            $table->id();
            $table->string('libelle');
            $table->foreignIdFor(Direction::class)->constrained();
            $table->foreignIdFor(Pole::class)->nullable()->constrained();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departements');
        Schema::dropIfExists('deleted_at');
    }
};
