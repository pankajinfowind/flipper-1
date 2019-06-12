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
   // console.log(this.component);
    // const windowOptions = {
    //   x: 300,
    //   y: 350,
    //   width: 300,
    //   height: 350,
    //   frame: false,
    //   icon: "src/assets/app-icon/png/icon.png"
    // };
    // const win=new BrowserWindow(windowOptions);
   
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
