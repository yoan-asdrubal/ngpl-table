import {
  Component,
  ContentChildren,
  ElementRef, forwardRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {NGPL_FILTER_MENU_BASE, NgplAutofocusDirective, NgplFilterMenuBase} from 'ngpl-filter';

@Component({
  selector: 'ngpl-filter-menu',
  templateUrl: './ngpl-filter-menu.component.html',
  styleUrls: ['./ngpl-filter-menu.component.scss'],
  providers: [
    {
      provide: NGPL_FILTER_MENU_BASE, useExisting: forwardRef(() => NgplFilterMenuComponent)
    }
  ]
})
export class NgplFilterMenuComponent implements OnInit, NgplFilterMenuBase {
  @Input() column = '';
  private overlayRef: OverlayRef;
  @ViewChild('templatePortalContent', {static: true}) templatePortalContent: TemplateRef<any>;
  @Input() useIcon = true;

  @ContentChildren(NgplAutofocusDirective, {descendants: true}) autofocus: QueryList<NgplAutofocusDirective>;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private _viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 25
      }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 25
      }
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }

  openPanelWithBackdrop(event): void {
    if (!!event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.overlayRef.attach(new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef));
    if (!!this.autofocus.first) {
      this.autofocus.first.onFocus();
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  close(): void{
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
