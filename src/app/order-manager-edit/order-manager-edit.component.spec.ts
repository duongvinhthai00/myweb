import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagerEditComponent } from './order-manager-edit.component';

describe('OrderManagerEditComponent', () => {
  let component: OrderManagerEditComponent;
  let fixture: ComponentFixture<OrderManagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManagerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
