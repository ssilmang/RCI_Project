<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model

{
    protected $fillable=['user_id','message','is_read'];
    use HasFactory;
    public function user(){
return $this->belongsTo(User::class);
    }
}
