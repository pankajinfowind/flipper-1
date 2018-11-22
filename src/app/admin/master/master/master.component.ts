import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterComponent implements OnInit {

links: any[] = [{path:'category',label:'Categories'},{path:'item',label:'Items'},{path:'insurance',label:'Insurances'} ];

@Select(MasterState.loading) loading$: Observable<boolean>;
isMobile=false;

leftColumnIsHidden=false;
rightColumnIsHidden=true;
constructor() {
 }

  ngOnInit() {
  //  this.getWinSize();
  }

getWinSize(){
  setInterval(()=>{
if(window.innerWidth < 1200 ){
  this.isMobile=true;
  this.rightColumnIsHidden=true;
}else{
  this.isMobile=false;
  this.rightColumnIsHidden=false;
}
  },1000);
}
}
