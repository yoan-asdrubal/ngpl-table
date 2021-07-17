import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplTableTestComponent } from './ngpl-table-test.component';

describe('NgplTableTestComponent', () => {
  let component: NgplTableTestComponent;
  let fixture: ComponentFixture<NgplTableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplTableTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
