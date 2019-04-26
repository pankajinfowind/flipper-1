import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Settings } from '../common/core/config/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit,AfterViewInit {
public appearance;
activeLinkIndex = -1;
  /**
     * Controls left column visibility.
     */
    public leftColumnIsHidden = false;
    private rlaSafe: boolean = false;
    isOpened:boolean=true;
    active_menu='dashboard';
  constructor(private router: Router,public setting:Settings,private changeDetectionRef: ChangeDetectorRef) {
      //this.router.navigate(["/admin/dashboard/analytics"]);
  }


  ngOnInit() {
    this.appearance=this.setting.getAll().appearance;
    this.active_menu=localStorage.getItem('active_menu');
  }
  public toggleLeftSidebar() {
    this.isOpened = !this.isOpened;
}
ngAfterViewInit() {
  this.rlaSafe = true;
  this.active_menu=localStorage.getItem('active_menu');
  this.changeDetectionRef.detectChanges();
}
  navigation(path){
    localStorage.setItem('active_menu',path);
    this.active_menu=path;
    this.router.navigate(["/admin/"+path]);
    
  }
}
