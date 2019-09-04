import { Component, OnInit, Input } from '@angular/core';
import { LocalStorage } from '../../common/core/services/local-storage.service';
@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() public component: string;
  constructor(public localStorage: LocalStorage) { }

  ngOnInit() {
   
  }

  onWinMin(){ 
}
onWinMax(){
   
}
onWinClose(){
}
 

}
