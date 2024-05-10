<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    use HasFactory;
    protected $fillable = ['libelle', 'service_id'];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    function FunctionName() : Returntype {
        // Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quae nisi corporis veritatis ut. Exercitationem cumque excepturi architecto! In rem, quam excepturi iusto consequuntur voluptatum perferendis quaerat nostrum tenetur odit.
    }
}
