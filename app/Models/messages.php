<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'message',
        'receiver_ID',
        'whoSent_ID',
        'XDDD',
        'checkbox'
    ];
}
