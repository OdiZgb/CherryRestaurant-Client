import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMarkaDialogComponent } from './delete-marka-dialog.component';

describe('DeleteMarkaDialogComponent', () => {
  let component: DeleteMarkaDialogComponent;
  let fixture: ComponentFixture<DeleteMarkaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMarkaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMarkaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
