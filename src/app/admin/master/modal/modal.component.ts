import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCategoryService } from '../categories/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() link = "";
  @Input() action = "";
  @Output()
  valueChange = new EventEmitter<any>();
  cateogryForm: FormGroup;
  public loading = new BehaviorSubject(false);
  constructor(private api:ApiCategoryService) { }


  ngOnInit() {
    this.cateogryForm = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
  }
  get name() {
    return this.cateogryForm.get("name");
  }

  close(){
    this.valueChange.emit({close_modal:true});
  }

  saveCategory(){
    if (this.cateogryForm.valid) {
      this.loading.next(true)
      const data = { name: this.cateogryForm.value.name };
      this.api.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
            this.valueChange.emit(res);
        },
        _error => {
        console.error(_error);
        }
      );
    }
  }

}
