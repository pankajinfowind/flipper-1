import { Component, OnInit, Input } from '@angular/core';
import { LocalStorage } from '../../common/core/services/local-storage.service';
const {BrowserWindow} = require('electron').remote;
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
    var window = BrowserWindow.getFocusedWindow();
           return window.minimize();  
}
onWinMax(){
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized()){
        window.unmaximize();
    }else{
        window.maximize();
    } 
}
onWinClose(){
    var window = BrowserWindow.getFocusedWindow();
    window.close();
}
 

}
