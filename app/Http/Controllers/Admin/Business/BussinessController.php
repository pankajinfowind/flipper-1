<?php

namespace App\Http\Controllers\Admin\Business;
use Redis;
use Log;
use App\Http\Controllers\Controller;
use App\Flipper\Business\Repositories\Interfaces\BusinessRepositoryInterface;
use App\Flipper\Business\Requests\CreateBusinessRequest;
class BussinessController extends Controller
{
       /**
     * @var BusinessRepositoryInterface
     */
    private $businessRepo;

    /**
     * BussinessController constructor.
     *
     * @param BusinessRepositoryInterface $businessRepo
     */
    public function __construct(BusinessRepositoryInterface $businessRepo)
    {
         $this->middleware('auth');
        $this->businessRepo = $businessRepo;
    }

    // public function index() // index bussiness
    // {
    //     $bussines_list=$this->loggedUser($this->request)->bussinesses;
    //     return $this->success(['bussiness'=>$bussines_list],200);
    // }


    /**
     * @param CreateBusinessRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateBusinessRequest $request)
    {

        $request['user_id']=$this->loggedUser($request)->id;
        return $this->success(['business_created'=>$this->businessRepo->createBusiness($request->all())],200);
    }

    // public function update() // store bussiness
    // {
    //     $validator= Validator::make($this->request->all(),['name' => 'required|string|min:1','type' => 'required|string|min:1','address' => 'required|string|min:1','description' => 'required|string|min:1']);
    //     if($validator->fails()){
    //         return $this->error(['error' => $validator->errors()], 422);

    //     } else {
    //         $this->entry= $this->entry->findOrFail($this->request['id'])
    //                                   ->update($this->request->all());
    //     // $redis = Redis::connection();
    //     // $redis->publish('message',json_encode($this->entry));

    //     return $this->success(['bussiness'=>$this->entry],200);
    //     }
    // }
    // public function destroy($id) // store bussiness
    // {
    //           return $this->success(['deleted'=>$this->entry->findOrFail($id)->delete()],200);

    // }
}
