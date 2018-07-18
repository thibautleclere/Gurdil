<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'last_update';
    protected $table = 'scores';

    public function getNains()
    {
        return $this->hasMany('App\Nain');
    }
}
