import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {Changes} from 'ngx-reactivetoolkit';
import {Observable, Subscription} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {NgplColumnConfig, NgplTableColumnConfig} from '../base/ngpl-column-config.model';

@UntilDestroy()
@Component({
  selector: 'ngpl-column-selector',
  templateUrl: './ngpl-column-selector.component.html',
  styleUrls: ['./ngpl-column-selector.component.scss']
})
export class NgplColumnSelectorComponent implements OnInit, OnChanges {

  private overlayRef: OverlayRef;
  @ViewChild('templatePortalContent', {static: true}) templatePortalContent: TemplateRef<any>;

  @Input() columnConfig: NgplTableColumnConfig;
  @Changes('columnConfig') columnConfig$: Observable<NgplTableColumnConfig>;
  @Output() viewColumn: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup = new FormGroup({});
  changeSubscription: Subscription;

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

    this.columnConfig$
      .pipe(
        untilDestroyed(this),
        tap((val: NgplTableColumnConfig) => {
          console.log('val', val);
          this.form = new FormGroup({});
          val.columns.forEach(v => {
            console.log('v', v);
            if (!v.hideColumn) {
              this.form.addControl(v.getOrDefault('column', v), new FormControl());

              if (!!v.getOrDefault( 'fixed', false)) {
                this.form.get(v.getOrDefault('column', v))?.disable();
              }
            }
          });
          console.log('this.form.value', this.form.value);
          val.selected.forEach(v => this.form.get(v).setValue(true));
          this.columnConfig = val;
          this.initFormChangesSubscription();
          this.viewColumn.emit(val.selected);
        })
      )
      .subscribe();
  }

  openPanelWithBackdrop(event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.overlayRef.attach(new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef));
  }

  ngOnChanges(): void {

  }

  initFormChangesSubscription(): void {
    if (!!this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
    this.changeSubscription = this.form.valueChanges
      .pipe(
        map(v => {
          const val = this.form.getRawValue();
          return Object.keys(val).filter(k => !!this.form.get(k).value);
        }),
        filter((sel: any[]) => sel.length > 0 && !!this.columnConfig),
        tap((sel: any[]) => this.viewColumn.emit(sel))
      )
      .subscribe();
  }
}
