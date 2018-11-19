import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterComponent implements OnInit {
add_toggled=false;
link: string = 'Items';
action:string ='';
nav_position:string='start';
links: string[] = ['Categories', 'Items', 'Insurances'];
shared_output;
  constructor() { }

  ngOnInit() {

  }


  goTo(position: string) {
    this.link = position;
  }
  add(){
    this.action='add';
    this.addToggled();
  }
  checkChanges(event){
    if(event.close_modal){
        this.addToggled();
    }
    if(event.category_created){
      this.shared_output=event.category_created;
    }

  }
  addToggled(){
    this.add_toggled=!this.add_toggled;
  }
}
