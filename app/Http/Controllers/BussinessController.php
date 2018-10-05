<?php

namespace App\Http\Controllers;
use Redis;
use Illuminate\Http\Request;
use Log;
class BussinessController extends Controller
{
    public function store(Request $request) //store bussiness
    {
        $data = $request->all();

       // $message = Message::create($data);

        $redis = Redis::connection();
        $redis->publish('message',json_encode($data));

        return response()->json($data,200);
    }
}
