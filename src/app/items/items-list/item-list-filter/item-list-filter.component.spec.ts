import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListFilterComponent } from './item-list-filter.component';

describe('ItemListFilterComponent', () => {
  let component: ItemListFilterComponent;
  let fixture: ComponentFixture<ItemListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
