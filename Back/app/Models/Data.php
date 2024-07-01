<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Data extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function controle()
    {
        return $this->hasMany(Controle::class);
    }

    public function type()
    {
        return $this->belongsTo(TypeControle::class, 'type_controle_id');
    }

}
