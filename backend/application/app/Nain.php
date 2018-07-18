<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nain extends Model
{
    protected $table = 'nains';

    public $timestamps = false;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    public function getScore()
    {
        return $this->hasOne('App\Score');
    }

    public function getLevel()
    {
        return $this->hasOne('App\Level');
    }
}
