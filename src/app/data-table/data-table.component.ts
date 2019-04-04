import {
    AfterContentInit,
    Component,
    ContentChildren, Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatColumnDef, MatPaginator, MatTable} from '@angular/material';
import {PaginatedDataTableSource} from './data/paginated-data-table-source';
import { SharedModel, SharedModelService } from '../shared-model/shared-model-service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DataTableComponent<T> implements OnInit, AfterContentInit {

    /**
     * Instance of material table.
     */
    @ViewChild(MatTable) table: MatTable<T>;

    /**
     * Column definitions provided via ng-content.
     */
    @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

    /**
     * Instance of material paginator component.
     */
    @ViewChild(MatPaginator) matPaginator: MatPaginator;

    /**
     * Data table source provided by user.
     */
    @Input() public dataSource: PaginatedDataTableSource<T>;

    /**
     * Display name for items inside the data table.
     */
    @Input() public itemsName: string;

    @Input() public hiddenCheckBox: boolean=false;
    @Input() public isLoading: boolean=false;
    /**
     * Columns that should be displayed in data table.
     */
    public columns: string[] = ['select'];
    public sharedModel$: Observable<SharedModel>;
    enableRowSelected=null;
    constructor(private sharedModelService:SharedModelService){}
    ngOnInit() {
        this.dataSource.config.matPaginator = this.matPaginator;
        this.dataSource.config.matSort.start = 'desc';
        this.sharedModel$ = this.sharedModelService.shared$;
        if ( ! this.dataSource.config.delayInit) this.dataSource.init();
        this.updateSelectedRow();
    }
    updateSelectedRow(){
          this.sharedModel$.subscribe(shared=>{
                if(shared.data){
                   this.enableRowSelected=shared.data;
                }else{
                  this.enableRowSelected=null;
                }
      });

    }

    ngAfterContentInit() {
        // Register the normal column defs to the table
        this.columnDefs.forEach(columnDef => {
            this.columns.push(columnDef.name);
            this.table.addColumnDef(columnDef);
        });
    }
}
