import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PayModelService } from './pay-model.service';
import { PayComponent } from './pay/pay.component';
import { PayModule } from './pay.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalePointComponent } from '../pos/sale-point/sale-point.component';


describe("PayComponent", () => {
    let component: PayComponent;
    let fixture: ComponentFixture<PayComponent>;
    let uniqueArray = ["A", "B"];

    const payModelService = jasmine.createSpyObj("PayModelService", [
      "update"
  ]);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PayModule, HttpClientTestingModule],
            providers: [
                { provide: PayModelService, useValue: payModelService }
            ]

        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // ?
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should remove duplicate from array", () => {
        const dpl = component.pay();
        expect(dpl).toEqual(uniqueArray);
    });
    it("should return [] when passed undefined or null", () => {
       const dpl = component.pay();
        expect(dpl).toEqual([]);
    });
});
