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
            $branch_repo->my_role =Auth::user()->roles->first();
            $this->branchPermission($branch_repo,$branch);
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
            $branch_repo->my_role =Auth::user()->roles->first();
            $this->branchPermission($branch_repo,$branch);
           return $branch_repo;
    }

    private function branchPermission($branch_repo,$branch){
        if(Auth::user()->roles->first()->name=='admin'){
            $branch_repo->users_belongs =$branch->users;
            $branch_repo->can_view_branch=true;
            $branch_repo->can_edit_branch=true;
            $branch_repo->can_delete_branch=true;
            $branch_repo->can_view_users=true;
            $branch_repo->can_grant_users=true;
            $branch_repo->can_revoke_users=true;

        }else if(Auth::user()->roles->first()->name=='manager'){
            $branch_repo->users_belongs =$branch->users;
            $branch_repo->can_view_branch=true;
            $branch_repo->can_edit_branch=true;
            $branch_repo->can_view_users=true;
            $branch_repo->can_grant_users=false;
            $branch_repo->can_delete_branch=false;
            $branch_repo->can_revoke_users=false;


        }else{
            $branch_repo->can_view_branch=true;
            $branch_repo->can_edit_branch=false;
            $branch_repo->can_view_users=false;
            $branch_repo->can_grant_users=false;
            $branch_repo->can_delete_branch=false;
            $branch_repo->can_revoke_users=false;
        }
    }
}
