<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Direction extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'libelle',
    ];

    protected $guarded = ['id'];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }
    
}
