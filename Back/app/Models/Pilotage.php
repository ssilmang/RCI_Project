<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Pilotage extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'controle_id',
        'objectif',
        'risque_couvert',
        'user_id',
        'periodicite',
        'exhaustivite',
        'preuve',
        'fichier',
    ];

    protected $guarded = ['id'];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
