<?php

use App\Models\Risque;
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
            $table->foreignIdFor(Risque::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('controles', function (Blueprint $table) {
            $table->dropColumn('risque_couvert');
            $table->dropForeign(['risque_id']);
        });
    }
};
