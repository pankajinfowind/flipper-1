<?php

namespace App\Http\Controllers\Admin\Categories;

use App\Flipper\Categories\Repositories\CategoryRepository;
use App\Flipper\Categories\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Flipper\Categories\Requests\CreateCategoryRequest;
use App\Flipper\Categories\Requests\UpdateCategoryRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Log;
class CategoryController extends Controller
{
    private $category_repo;

    public function __construct(CategoryRepositoryInterface $category_repo)
    {
        $this->middleware('auth');
        $this->category_repo = $category_repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = $this->category_repo->listCategories('created_at', 'desc', 1)->where('business_id','=', 1);

        return $this->success(['categories'=> $this->category_repo->paginateArrayResults($list->all())],200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  CreateCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCategoryRequest $request)
    {
        if(!$this->loggedUser()->business){
            return $this->error(['Unable to find business'],404);
        }
        $request['business_id']=$this->loggedUser()->business->id;
        Log::info($request->all());
        return $this->success(['category_created'=> $this->category_repo->createCategory($request->all()) ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = $this->category_repo->findCategoryById($id);

        $cat = new CategoryRepository($category);
        return $this->success(['categories'=>[
                'category' => $category,
                'children' => $category->children,
                'items' => $cat->findItems()
            ]
        ],200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCategoryRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
        public function update(UpdateCategoryRequest $request, $id)
        {
            $category = $this->category_repo->findCategoryById($id);

            $update = new CategoryRepository($category);

            return $this->success(['category_updated'=>
                                $update->updateCategory($request->except('_token', '_method'))
                            ],200);
        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $category = $this->category_repo->findCategoryById($id);
        $category->items()->sync([]);

        return $this->success(['deleted'=>   $category->delete() ],200);
    }


}
