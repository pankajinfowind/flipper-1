import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Input,
  Inject,
  ViewEncapsulation
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiItemService } from "./api/api.service";
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { finalize } from "rxjs/operators";
import { Store, Select } from "@ngxs/store";
import { Details } from "../../../details/details";
import { DetailsService } from "../../../details/details.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Item } from "./api/item";
import { Toast } from "../../../common/core/ui/toast.service";
import { MasterModelService } from '../master-model.service';
import { Master } from '../master';
import { Router } from '@angular/router';
import { BootstrapperMaster } from '../bootstrapper.service';

@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./items.component.scss"]
})
export class RemoveItemDialog {
  item_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api: ApiItemService,
    public dialogRef: MatDialogRef<RemoveItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    deleteItem(){
      this.loading.next(true);

          this.api
          .delete({data:this.data}).subscribe(
              res => {
                  if(res.status=='success'){
                    this.toast.open('Item(s) deleted!');
                    this.dialogRef.close({status:'success'});
                    this.msterModelService.update({loading:false, items:res["items"]["data"]?res["items"]["data"]:[]});
                  }
              },
              _error => {
                this.dialogRef.close({status:'not'});
                this.toast.open('Nothing deleted!');
                console.error(_error);
              }
          );


    }


  close(): void {
    this.dialogRef.close({status:'none'});
  }
}

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  add_item: boolean;
  constructor(private bootstrapper_master:BootstrapperMaster,private router: Router,private msterModelService:MasterModelService,public dialog: MatDialog,private detailsService:DetailsService,private api: ApiItemService, private ref: ChangeDetectorRef) {
    this.init_master();
  }
  data: Item[] = [];
  displayedColumns: string[] = [
    'select',
    "sku",
    "barcode",
    "item",
    "product_order_code",
    "article_code",
    "category",
    "brand",
    'tax_rate',
    'manufacturer',
    'summary'
  ];

  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output: Item;

  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<Item>(true, []);
  master$: Observable<Master>;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  init_master() {
    return this.bootstrapper_master.bootstrap();
    }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.details$ = this.detailsService.details$;
    this.master$ = this.msterModelService.master$;

    this.master$.subscribe(res=>{
      if(res.items.length  > 0){
        this.data=res.items;
        this.dataSource.data=this.data;
        this.detailsService.close();
      }else{
        this.canUserAddItem();
      }
  });
  }
  openDetails(title='New Items',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-master',component:'app-items',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveItemDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          this.selection = new SelectionModel<Item>(true, []);
         }
      });

    }

  }

  checkIncomingData() {
    this.details$.subscribe(result=>{
      if(result.receriver_data){
        const _data = this.dataSource.data;
        if(result.action=='edit'){
          for( var i =0 ;i <_data.length; i++){
                if(_data[i]['id'] === result.sender_data['id']){
                  _data.splice(i, 1);
                }
            }
        }
          _data.unshift(result.receriver_data);
          this.dataSource.data = _data;
          this.detailsService.update({receriver_data:null,sender_data:null});
      }
    });
  }
  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' currently.';
  }

  addItem(){
    this.router.navigate(["/admin/master/add-item"]);
   // localStorage.setItem('add-item','Yes');
  }
  canUserAddItem(){
    if(this.data && this.data.length == 0){
      this.router.navigate(["/admin/master/add-item"]);
     }

  }
}
