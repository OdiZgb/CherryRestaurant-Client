import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradersComponent } from './traders.component';

describe('TradersComponent', () => {
  let component: TradersComponent;
  let fixture: ComponentFixture<TradersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
