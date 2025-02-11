import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkasComponent } from './markas.component';

describe('MarkasComponent', () => {
  let component: MarkasComponent;
  let fixture: ComponentFixture<MarkasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
