import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPaylatersComponent } from './display-paylaters.component';

describe('DisplayPaylatersComponent', () => {
  let component: DisplayPaylatersComponent;
  let fixture: ComponentFixture<DisplayPaylatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPaylatersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPaylatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
