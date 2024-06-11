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
            $table->unsignedBigInteger('contry_id')->after('id')->nullable();            
            $table->foreign('contry_id')->references('id')->on('contrys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('controles', function (Blueprint $table) {
      
             $table->dropForeign(['contry_id']);

             
             $table->dropColumn('contry_id');
         });
       
    }
};
