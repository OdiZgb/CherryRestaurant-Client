import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkaComponent } from './add-marka.component';

describe('AddMarkaComponent', () => {
  let component: AddMarkaComponent;
  let fixture: ComponentFixture<AddMarkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMarkaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMarkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
