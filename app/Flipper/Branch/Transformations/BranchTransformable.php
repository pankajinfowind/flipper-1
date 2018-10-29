<?php

namespace App\Flipper\Branch\Transformations;

use Illuminate\Support\Facades\Storage;
use App\Flipper\Branch\Branch;
use Auth;
use App\Flipper\Roles\Role;
use Log;
trait BranchTransformable
{
    /**
     * Transform the item
     *
     * @param Item $item
     * @return Item
     */
    protected function transformBranch($data)
    {
        if(isset($data) && is_array($data)) {
           return  $this->transformArray($data);
        }else{
           return $this-> transformObject($data);
         }

    }
    function transformArray($branches)
    {
        $branch_array=[];

        $branch_repo = new Branch;
        foreach($branches as $branch){
            $branch_repo->branch_id = (int) $branch->id;
            $branch_repo->branch = $branch->name;
            $branch_repo->is_active = $branch->active;
            $branch_repo->created_at = $branch->created_at;
            $branch_repo->updated_at = $branch->updated_at;
            $branch_repo->business_belongs = Auth::user()->business->where('id',$branch->business_id)->first();
            $branch_repo->user_belongs =$branch->users;
            $branch_repo->user_role =Auth::user()->roles->first();
            $branch_array[]=$branch_repo;

        }
        return $branch_array;
    }

    function transformObject($branch)
    {
            $branch_repo = new Branch;
            $branch_repo->branch_id = (int) $branch->id;
            $branch_repo->branch = $branch->name;
            $branch_repo->is_active = $branch->active;
            $branch_repo->created_at = $branch->created_at;
            $branch_repo->updated_at = $branch->updated_at;
            $branch_repo->business_belongs = Auth::user()->business->where('id',$branch->business_id)->first();
            $branch_repo->user_belongs =$branch->users;
            $branch_repo->user_role =Auth::user()->roles->first();
           return $branch_repo;
    }
}
