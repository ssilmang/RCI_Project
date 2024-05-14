<?php

namespace App\Models;

use App\Models\Departement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Service extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $guarded = ['id'];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    protected $fillable = ['libelle', 'departement_id'];
    public function departement()
    {
        return $this->belongsTo(Departement::class); 
    }
}
