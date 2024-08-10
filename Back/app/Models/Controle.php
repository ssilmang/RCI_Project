<?php

namespace App\Models;

use App\Models\Pole;
use App\Models\User;
use App\Models\Service;
use App\Models\Activite;
use App\Models\Direction;
use App\Models\TypeControle;
use App\Models\Departement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Controle extends Model
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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

    public function risque()
    {
        return $this->belongsTo(Risque::class);
    }

    public function type()
    {
        return $this->belongsTo(TypeControle::class, 'type_controle_id');
    }


}
