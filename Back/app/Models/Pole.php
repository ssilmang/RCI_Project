<?php

namespace App\Models;

use App\Models\Direction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Pole extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'libelle',
        'direction_id',

    ];

    protected $guarded = ['id'];


    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }

    public function data()
    {
        return $this->hasMany(Pilotage::class);
    }

}
