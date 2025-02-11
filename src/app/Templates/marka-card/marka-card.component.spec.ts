import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaCardComponent } from './marka-card.component';

describe('MarkaCardComponent', () => {
  let component: MarkaCardComponent;
  let fixture: ComponentFixture<MarkaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
