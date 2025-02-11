import { TestBed } from '@angular/core/testing';

import { MainSeviceService } from './main-sevice.service';

describe('MainSeviceService', () => {
  let service: MainSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
