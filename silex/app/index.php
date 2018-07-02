<?php

use Doctrine\Common\Annotations\AnnotationRegistry;
use Silex\Application;
use Silex\Provider\DoctrineServiceProvider;
use Dflydev\Provider\DoctrineOrm\DoctrineOrmServiceProvider;

$loader = require __DIR__ . '/vendor/autoload.php';
$app = new Application();
$app->error(function (Exception $e) use ($app) {
    return new \Symfony\Component\HttpFoundation\Response("Something goes terribly wrong: " . $e->getMessage());
});
AnnotationRegistry::registerLoader([$loader, 'loadClass']);
$app->register(
    new DoctrineServiceProvider(),
    [
        'db.options' => [
            'driver'        => 'pdo_mysql',
            'host'          => 'localhost',
            'dbname'        => 'gurdil',
            'user'          => 'root',
            'password'      => '',
            'charset'       => 'utf8',
            'driverOptions' => [
                1002 => 'SET NAMES utf8',
            ],
        ],
    ]
);
$app->register(new DoctrineOrmServiceProvider(), [
    'orm.proxies_dir'             => $baseDir . 'src/App/Entity/Proxy',
    'orm.auto_generate_proxies'   => $app['debug'],
    'orm.em.options'              => [
        'mappings' => [
            [
                'type'                         => 'annotation',
                'namespace'                    => 'App\\Entity\\',
                'path'                         => __DIR__ . '/App/Entity',
                'use_simple_annotation_reader' => false,
            ],
        ],
    ]
]);

$app->get('hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('', function () use ($app) {
    return 'Hello Gurdil youpi';
});


$app->run();