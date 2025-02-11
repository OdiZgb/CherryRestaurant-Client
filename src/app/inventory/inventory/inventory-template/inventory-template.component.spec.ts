import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTemplateComponent } from './inventory-template.component';

describe('InventoryTemplateComponent', () => {
  let component: InventoryTemplateComponent;
  let fixture: ComponentFixture<InventoryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
