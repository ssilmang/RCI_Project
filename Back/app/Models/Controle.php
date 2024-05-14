<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Controle extends Model
{
    use SoftDeletes;
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
