<?php

namespace App\Models;

use App\Models\Activite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Activite extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = ['libelle','service_id'];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    function FunctionName() : Returntype {

    }
}
