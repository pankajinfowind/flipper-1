import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SessionsComponent } from "./sessions.component";
import { PosModule } from "../pos.module";
import { ApiService } from '../../api/api.service';
import { CurrentUser } from '../../common/auth/current-user';
let apiMock: Partial<ApiService>
apiMock = {
    
}
class currentUserMock{

}
describe("SessionComponent", () => {
  let component: SessionsComponent;
  let fixture: ComponentFixture<SessionsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PosModule],
      providers: [{provide: ApiService,useValue:apiMock},{provide: CurrentUser, useValue: currentUserMock}]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiMock = fixture.debugElement.injector.get(ApiService); 
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("stub object and  injected ApiService should not be the same", () => {
    expect(apiMock === ApiService).toBeFalsy();

    //changing the stub object has no effect on injected service
    // apiMock
  });
});
