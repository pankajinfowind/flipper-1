import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportManagerComponent } from './report-manager.component';
import { MaterialModule } from '../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReportManagerComponent', () => {
  let component: ReportManagerComponent;
  let fixture: ComponentFixture<ReportManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ReportManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
