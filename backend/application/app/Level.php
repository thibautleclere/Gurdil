<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'last_update';
    protected $table = 'levels';

    protected $fillable = [
        'name'
    ];


    public function getNains()
    {
        return $this->hasMany('App\Nain');
    }
}
