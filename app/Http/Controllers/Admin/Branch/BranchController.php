<?php

namespace App\Http\Controllers\Admin\Branch;
use Redis;
use Log;
use App\Http\Controllers\Controller;
use App\Flipper\Branch\Repositories\Interfaces\BranchRepositoryInterface;
use App\Flipper\Branch\Requests\CreateBranchRequest;
use App\Flipper\Branch\Requests\UpdateBranchRequest;
use App\Flipper\Branch\Repositories\BranchRepository;
use App\Flipper\Branch\Transformations\BranchTransformable;
class BranchController extends Controller
{
    use BranchTransformable;
       /**
     * @var BranchRepositoryInterface
     */
    private $branch_repo;

    /**
     * BranchController constructor.
     *
     * @param BranchRepositoryInterface $branch_repo
     */
    public function __construct(BranchRepositoryInterface $branch_repo)
    {
         $this->middleware('auth');
        $this->branch_repo = $branch_repo;
    }

    public function index() // index Branch
     {
        return $this->success(['branch'=>$this->transformArray($this->loggedUser()->branchies)],200);
    }


    /**
     * @param CreateBranchRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateBranchRequest $request)
    {

        if(!$this->loggedUser()->business){
            return $this->error(['Unable to find business'],404);
        }
        $request['business_id']=$this->loggedUser()->business->id;

        $branch=$this->branch_repo->createBranch($request->all());

        $this->loggedUser()->branchies()->attach($branch);
        return $this->success(['branch_created'=>$this->transformObject($branch) ],200);
    }

    public function update(UpdateBranchRequest $request,$id) // store Branch
    {
        $Branch = $this->branch_repo->findBranchById($id);
        $update = new BranchRepository($Branch);
        return $this->success(['branch_updated'=>$update->updateBranch($request->all())],200);


    }
    public function destroy($id) // delete Branch
    {
        $branch = $this->branch_repo->findBranchById($id);
        $delete   = new BranchRepository($branch);

        return $this->success(['deleted'=> $delete->deleteBranch() ],200);

    }
}
