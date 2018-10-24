<?php

namespace App\Http\Controllers\Admin\Business;
use Redis;
use Log;
use App\Http\Controllers\Controller;
use App\Flipper\Business\Repositories\Interfaces\BusinessRepositoryInterface;
use App\Flipper\Business\Requests\CreateBusinessRequest;
use App\Business\Roles\Requests\UpdateBusinessRequest;
use App\Flipper\Business\Repositories\BusinessRepository;
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

    public function index() // index bussiness
     {
    //     $bussines_list=$this->loggedUser($this->request)->business;
        return $this->success(['bussiness'=>$this->loggedUser()->business],200);
    }


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

    public function update(UpdateBusinessRequest $request,$id) // store bussiness
    {
        $business = $this->businessRepo->findBusinessById($id);
        $update = new BusinessRepository($business);
        return $this->success(['business_updated'=>$update->updateBusiness($request->all())],200);


    }
    public function destroy($id) // delete bussiness
    {
        $business = $this->businessRepo->findBusinessById($id);
        $delete   = new BusinessRepository($business);

        return $this->success(['deleted'=> $delete->deleteBusiness() ],200);

    }
}
