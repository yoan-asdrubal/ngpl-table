import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplFiltersAppliedComponent } from './ngpl-filters-applied.component';

describe('WidgetFilteredAppliedComponent', () => {
  let component: NgplFiltersAppliedComponent;
  let fixture: ComponentFixture<NgplFiltersAppliedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplFiltersAppliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplFiltersAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
