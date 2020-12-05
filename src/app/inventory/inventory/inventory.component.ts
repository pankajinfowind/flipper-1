import { Component, OnInit } from '@angular/core'
import { trigger, transition, useAnimation } from '@angular/animations'
import { fadeInAnimation } from '@enexus/flipper-components'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    trigger('insertInventory', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class InventoryComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
