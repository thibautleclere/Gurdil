<?php

namespace App\Http\Controllers;

use App\Nain;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;

class LoginController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function login(Request $request)
    {
        $login = $request->input('login');
        $password = $request->input('password');

        $user = Nain::where(
            array('email' => $login),
            array('password' => $password)
            )
            ->get(array(
                'id','name','email','created_at','updated_at'
            ))
            ->first();

        $data = array($user);
        return new JsonResponse($data);
    }
}
