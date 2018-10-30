<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stock;
use Validator;
use Log;

class StockController extends Controller
{

    private $entry;

    public function __construct(Request $request, Stock $entry)
    {
        $this->request = $request;
        $this->entry = $entry;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $bussines_list=$this->loggedUser($this->request)->bussinesses;
       // return $this->success(['stock'=>$bussines_list],200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //FIXME: why can't you use Request to validate form input?
        $validator = Validator::make($this->request->all(), ['name' => 'required|string|min:1', 'address' => 'required|string|min:1', 'business_id' => 'required|integer|min:1']);
        if ($validator->fails()) {
            return $this->error(['error' => $validator->errors()], 422);
        } else {

            $this->entry = $this->entry->create($this->request->all());

        // $redis = Redis::connection();
        // $redis->publish('message',json_encode($this->entry));

            return $this->success(['stock' => $this->entry], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
