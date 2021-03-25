import { TestBed } from '@angular/core/testing';

import { CategorySubServiceService } from './category-sub-service.service';

describe('CategorySubServiceService', () => {
  let service: CategorySubServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorySubServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
