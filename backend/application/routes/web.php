<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-web', function () {
    echo "lkqslqkqlksqlks";
});

Route::get('/new-user', 'SignupController@signup');
Route::post('/get-user', 'LoginController@login')->name('getUser');
Route::get('/les-nains', 'GurdilController@getPlayers');
