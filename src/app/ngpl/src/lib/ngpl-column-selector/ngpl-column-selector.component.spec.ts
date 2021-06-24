import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplColumnSelectorComponent } from './ngpl-column-selector.component';

describe('WidgetColumnSelectorComponent', () => {
  let component: NgplColumnSelectorComponent;
  let fixture: ComponentFixture<NgplColumnSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplColumnSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
