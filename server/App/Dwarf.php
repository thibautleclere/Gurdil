<?php

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\Annotation;

class Dwarf
{
    /**
     * @ORM\Column
     */
    private $name;

    private $login;

    private $password;

    private $email;

    private $om;

    public function __construct(ObjectManager $manager) {
        $this->om = $manager;
    }
}