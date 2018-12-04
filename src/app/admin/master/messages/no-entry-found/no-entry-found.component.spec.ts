import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEntryFoundComponent } from './no-entry-found.component';

describe('NoEntryFoundComponent', () => {
  let component: NoEntryFoundComponent;
  let fixture: ComponentFixture<NoEntryFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEntryFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEntryFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
