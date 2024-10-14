<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activite extends Model
{
    use SoftDeletes;
    use HasFactory;

    // protected $fillable = ['libelle','service_id'];

    protected $guarded = ['id'];


    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function data()
    {
        return $this->hasMany(Controle::class);
    }


}
