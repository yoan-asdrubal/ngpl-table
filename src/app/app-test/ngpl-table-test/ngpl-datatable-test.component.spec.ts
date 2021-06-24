import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplDatatableTestComponent } from './ngpl-datatable-test.component';

describe('NgplTableTestComponent', () => {
  let component: NgplDatatableTestComponent;
  let fixture: ComponentFixture<NgplDatatableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplDatatableTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplDatatableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
