import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplDatatableComponent } from './ngpl-datatable.component';

describe('WidgetFilteredDatatableComponent', () => {
  let component: NgplDatatableComponent;
  let fixture: ComponentFixture<NgplDatatableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
