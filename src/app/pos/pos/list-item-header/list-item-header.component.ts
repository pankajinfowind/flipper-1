import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PosCateoriesState } from '../../../store/states/PosCategoryStates';
import { Observable } from 'rxjs';
import { Category } from '../../../admin/master/categories/api/category';
import { ClosePosCategory } from '../../../store/actions/pos-categories.action';
import { Router } from '@angular/router';

@Component({
  selector: 'pos-list-item-header',
  templateUrl: './list-item-header.component.html',
  styleUrls: ['./list-item-header.component.scss'],
})
export class ListItemHeaderComponent implements OnInit {
  @Select(PosCateoriesState.category) category$: Observable<Category>;
  constructor(private store:Store,private router: Router) { }

  ngOnInit() {
  }
  goBackToCategory(){
    this.store.dispatch(new ClosePosCategory());
    return this.router.navigate(['/admin/pos/till-categories']);
  }
}
