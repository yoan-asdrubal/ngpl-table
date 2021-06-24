import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplFilterMenuComponent } from './ngpl-filter-menu.component';

describe('WidgetFilterOptionComponent', () => {
  let component: NgplFilterMenuComponent;
  let fixture: ComponentFixture<NgplFilterMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplFilterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
