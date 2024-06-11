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
        Schema::table('controles', function (Blueprint $table) {       
             $table->unsignedBigInteger('type_controle_id')->after('id')->nullable();            
             $table->foreign('type_controle_id')->references('id')->on('type_controles')->onDelete('cascade');
         });
       
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('controles', function (Blueprint $table) {
             // Supprimez la clé étrangère si elle existe
             $table->dropForeign(['type_controle_id']);

             // Supprimez la colonne 'type_controle_id'
             $table->dropColumn('type_controle_id');
         });
        
    }
};
