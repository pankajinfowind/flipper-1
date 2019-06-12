import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Settings } from '../common/core/config/settings.service';
import { Router } from '@angular/router';
import { LocalStorage } from '../common/core/services/local-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
public appearance;
activeLinkIndex = -1;
  
    public leftColumnIsHidden = false;
    isOpened:boolean=true;

  constructor(public localStorage: LocalStorage,private router: Router,public setting:Settings,private changeDetectionRef: ChangeDetectorRef) {
    
  }


  ngOnInit() {
    this.appearance=this.setting.getAll().appearance;
  }

  public toggleLeftSidebar() {
    this.isOpened = !this.isOpened;
}

  navigation(path){
    this.localStorage.set('active_menu', path);
    this.router.navigate(["/admin/"+path]);

  }
}
