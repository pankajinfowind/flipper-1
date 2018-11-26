import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../categories/api/category';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiCategoryService } from '../../categories/api/api.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';

@Component({
  selector: 'app-category-model',
  templateUrl: './category-model.component.html',
  styleUrls: ['./category-model.component.scss']
})
export class CategoryModelComponent implements OnInit {

  categories: Category[] = [];
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new:boolean=true;
  category_id:number=0;
  cateogryForm: FormGroup;

  constructor(private toast: Toast,private apiCat:ApiCategoryService,private apiItem:ApiItemService,private detailsService:DetailsService) { }

  ngOnInit() {



    this.details$ = this.detailsService.details$;
    this.details$.subscribe(res=>{
        if(res.action=='new'){
          this.need_to_add_new=true;
        }else{
          this.need_to_add_new=false;
        }

        this.category_id=res.sender_data?res.sender_data.category_id:0;

        this.cateogryForm = new FormGroup({
          name: new FormControl(res.sender_data?res.sender_data.name:"", [Validators.required])
        });
  });
  }




  ///////////////////////////// Category
  get name() {
    return this.cateogryForm.get("name");
  }


  saveCategory(){
    if (this.cateogryForm.valid) {
      this.loading.next(true)
      const data = { name: this.cateogryForm.value.name };
      return  this.need_to_add_new?this.create(data):this.update(data,this.category_id);
    }
  }

  create(data){
    this.apiCat.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Category added Successfully!');
            this.cateogryForm.reset();
            this.detailsService.update({receriver_data:res.data});
          }
      },
      _error => {
      console.error(_error);
      }
    );
  }
  update(data,id){
    this.apiCat.update(data,id).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Category updated Successfully!');
            this.cateogryForm.reset();
            this.detailsService.update({receriver_data:res.data});
            this.close();
          }
      },
      _error => {
      console.error(_error);
      }
    );
  }

  close(){
    this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }

}
