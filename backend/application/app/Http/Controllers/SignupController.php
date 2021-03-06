<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Nain;
use Illuminate\Http\JsonResponse;

class SignupController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function signup(Request $request)
    {
        $user = Nain::find(2)->get();

        $data = array($user);
        return new JsonResponse($data);
    }
}
