<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiToken;

class User extends Authenticatable implements JWTSubject
{
    use SoftDeletes;
    use HasFactory, Notifiable;

    protected $guarded = ['id'];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

     protected $hidden = [
        'password',
        'remember_token',
        'updated_at',
        'created_at',
        'email_verified_at'
    ];

    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function pays()
    {
        return $this->belongsTo(Contry::class);
    }

    public function profil()
    {
        return $this->belongsTo(Profil::class);
    }

    public function data()
    {
        return $this->hasMany(Controle::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
