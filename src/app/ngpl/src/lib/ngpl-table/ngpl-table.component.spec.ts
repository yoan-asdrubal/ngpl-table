import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplTableComponent } from './ngpl-table.component';

describe('NgplTableComponent', () => {
  let component: NgplTableComponent;
  let fixture: ComponentFixture<NgplTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
