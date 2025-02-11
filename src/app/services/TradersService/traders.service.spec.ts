import { TestBed } from '@angular/core/testing';

import { TradersService } from './traders.service';

describe('TradersService', () => {
  let service: TradersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
