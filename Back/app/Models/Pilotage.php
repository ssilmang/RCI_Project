<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Pilotage extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $guarded = ['id'];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function controle()
    {
        return $this->belongsTo(Controle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }

    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }

}
