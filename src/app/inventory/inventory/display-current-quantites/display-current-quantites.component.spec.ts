import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCurrentQuantitesComponent } from './display-current-quantites.component';

describe('DisplayCurrentQuantitesComponent', () => {
  let component: DisplayCurrentQuantitesComponent;
  let fixture: ComponentFixture<DisplayCurrentQuantitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCurrentQuantitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCurrentQuantitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
