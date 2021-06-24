import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplFilterAppliedValueComponent } from './ngpl-filter-applied-value.component';

describe('WidgetFilteredAppliedSingleComponent', () => {
  let component: NgplFilterAppliedValueComponent;
  let fixture: ComponentFixture<NgplFilterAppliedValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplFilterAppliedValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplFilterAppliedValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
