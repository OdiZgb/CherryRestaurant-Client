import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySalariesComponent } from './display-salaries.component';

describe('DisplaySalariesComponent', () => {
  let component: DisplaySalariesComponent;
  let fixture: ComponentFixture<DisplaySalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySalariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
