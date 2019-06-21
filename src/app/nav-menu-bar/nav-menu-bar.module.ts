import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { MaterialModule } from '../material/material.module';
import { NavService } from './nav.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports:[],
  providers: [NavService]
})
export class NavMenuBarModule { }
