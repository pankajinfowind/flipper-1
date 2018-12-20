import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PosModule } from "../pos.module";
import { PosModelService } from "../pos-model.service";
import { OrderItemsModelService } from "../cart/order-item-model.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SalePointComponent } from './sale-point.component';
import { ApiPosService } from '../api/api.service';
import { StockModelService } from '../../stock/stock-model.service';
import { MasterModelService } from '../../admin/master/master-model.service';
import { OrderModelService } from '../../orders/order-model.service';
import { CurrentUser } from '../../common/auth/current-user';
import { Category } from '../../admin/master/categories/api/category';
import { CATEGORY_MOCK_DUPLICATE, CATEGORY_UNIQUE, STOCK } from '../../mock-data/MOCK';



describe("SaleComponent", () => {
    let component: SalePointComponent;
    let fixture: ComponentFixture<SalePointComponent>;
    let duplicate = CATEGORY_MOCK_DUPLICATE;

    let uniqueArray: Category[] = CATEGORY_UNIQUE;
    const orderModelService = jasmine.createSpyObj("orderModelService", [
        "getRows"
    ]);
    const posmodelMockService = jasmine.createSpyObj("ApiPosService", [
        "updateOrderItem"
    ]);
    const orderItemMockService = jasmine.createSpyObj("PosModelService", [
        "update"
    ]);
    const stockModelService = jasmine.createSpyObj("StockModelService", [
        "update"
    ]);
    const msterModelService = jasmine.createSpyObj("MasterModelService", [
        "master"
    ]);
    const posModelService = jasmine.createSpyObj("PosModelService", [
        "master"
    ]);
    const currentUser = jasmine.createSpyObj("CurrentUser", [
        "master"
    ]);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PosModule, HttpClientTestingModule],
            providers: [
                { provide: PosModelService, useValue: posModelService },
                { provide: CurrentUser, useValue: currentUser },
                { provide: OrderItemsModelService, useValue: orderItemMockService },
                { provide: OrderModelService, useValue: orderModelService },
                { provide: ApiPosService, useValue: posmodelMockService },
                { provide: StockModelService, useValue: stockModelService },
                { provide: MasterModelService, useValue: msterModelService }
            ]

        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SalePointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // ?
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should remove duplicate from array", () => {
        const dpl = component.getRows(duplicate);
        expect(dpl).toEqual(uniqueArray);
    });
    it("should push item into cat", () => {
        // expect(component.C).toEqual();
    });
    it("should add itemToCatd", () => {
        component.is_categry_clicked = true;
        component.addItemToCart(STOCK[0]);

    });
    it("should return [] when passed undefined or null", () => {
        const dpl = component.getRows(undefined);
        expect(dpl).toEqual([]);
    });
});
