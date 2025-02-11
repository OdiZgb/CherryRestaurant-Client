import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalariesComponent } from './add-salaries.component';

describe('AddSalariesComponent', () => {
  let component: AddSalariesComponent;
  let fixture: ComponentFixture<AddSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
