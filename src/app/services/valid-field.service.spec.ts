import { TestBed } from '@angular/core/testing';

import { ValidFieldService } from './valid-field.service';

describe('ValidFieldService', () => {
  let service: ValidFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
