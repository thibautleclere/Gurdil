<?php

namespace App\Forms;

use Kris\LaravelFormBuilder\Form;

class NainForm extends Form
{
    public function buildForm()
    {
        $this
            ->add('name', 'text')
            ->add('email', 'text')
            ->add('password', 'text');
    }
}
