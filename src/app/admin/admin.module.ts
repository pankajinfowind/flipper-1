import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { MaterialModule } from "../material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { UiModule } from "../common/core/ui/ui.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    UiModule
  ],
  exports: [AdminComponent],
  declarations: [AdminComponent]
})
export class AdminModule {}
