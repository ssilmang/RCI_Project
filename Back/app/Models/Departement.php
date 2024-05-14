<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Departement extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $guarded = ['id'];

    protected $fillable = [
        'libelle',
        'direction_id',
        'pole_id',
    ];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function data()
    {
        return $this->hasMany(Pilotage::class);
    }

}
