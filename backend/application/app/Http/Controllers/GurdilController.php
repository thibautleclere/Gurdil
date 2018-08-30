<?php


namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Nain;

class GurdilController extends BaseController
{

    public function getPlayers(Request $request)
    {
        $users = Nain::all();
        return new JsonResponse($users);
    }

}