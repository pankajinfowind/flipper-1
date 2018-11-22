import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "../items/items.component";
import { CategoriesComponent } from "../categories/categories.component";
import { MasterComponent } from "./master.component";
import { MaterialModule } from "../../../material/material.module";
import { ModalComponent } from "../modal/modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InsuranceComponent } from "../insurance/insurance.component";
import { MasterState } from "../../../state/master-state";
import { NgxsModule } from '@ngxs/store';
import { UiModule } from "../../../common/core/ui/ui.module";
import { MasterRoutingModule } from "./master-routing.module";

@NgModule({
  imports: [CommonModule,MasterRoutingModule, MaterialModule, FormsModule, UiModule, ReactiveFormsModule,NgxsModule.forFeature([MasterState])],
  exports: [
    ItemsComponent,
    CategoriesComponent,
    MasterComponent,
    ModalComponent,
    InsuranceComponent
  ],
  declarations: [
    ItemsComponent,
    CategoriesComponent,
    MasterComponent,
    ModalComponent,
    InsuranceComponent
  ]
})
export class MasterModule {}
