import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmanagerComponent } from './productmanager.component';

describe('ProductmanagerComponent', () => {
  let component: ProductmanagerComponent;
  let fixture: ComponentFixture<ProductmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
