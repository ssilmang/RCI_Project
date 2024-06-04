<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Risque extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['libelle'];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    
    public function data()
    {
        return $this->hasMany(Controle::class);
    }

}
