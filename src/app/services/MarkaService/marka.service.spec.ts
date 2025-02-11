import { TestBed } from '@angular/core/testing';

import { MarkaService } from './marka.service';

describe('MarkaService', () => {
  let service: MarkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
