import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceViewerComponent } from './employee-attendance-viewer.component';

describe('EmployeeAttendanceViewerComponent', () => {
  let component: EmployeeAttendanceViewerComponent;
  let fixture: ComponentFixture<EmployeeAttendanceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAttendanceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
