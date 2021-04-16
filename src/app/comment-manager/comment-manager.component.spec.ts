import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManagerComponent } from './comment-manager.component';

describe('CommentManagerComponent', () => {
  let component: CommentManagerComponent;
  let fixture: ComponentFixture<CommentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
