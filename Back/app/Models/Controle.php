<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Controle extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'code',
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

}
