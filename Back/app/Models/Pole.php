<?php

namespace App\Models;

use App\Models\Direction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pole extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }
}
