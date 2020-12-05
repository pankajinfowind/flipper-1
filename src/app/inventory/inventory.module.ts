import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory/inventory.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, InventoryRoutingModule, SharedModule],
})
export class InventoryModule {}
