import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagerDetailComponent } from './order-manager-detail.component';

describe('OrderManagerDetailComponent', () => {
  let component: OrderManagerDetailComponent;
  let fixture: ComponentFixture<OrderManagerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManagerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
