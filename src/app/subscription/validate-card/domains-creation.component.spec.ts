import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { CardValidationComponent } from './validate-card.component'

describe('CardValidationComponent', () => {
  let component: CardValidationComponent
  let fixture: ComponentFixture<CardValidationComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CardValidationComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CardValidationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
