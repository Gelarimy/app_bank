import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPlanListComponent } from './credit-plan-list.component';

describe('CreditlistComponent', () => {
  let component: CreditPlanListComponent;
  let fixture: ComponentFixture<CreditPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
