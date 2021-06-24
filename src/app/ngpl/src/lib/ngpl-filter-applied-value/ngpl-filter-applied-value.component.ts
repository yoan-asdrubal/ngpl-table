import {Component, Inject, Input, OnChanges, OnInit, Optional} from '@angular/core';
import {Changes} from 'ngx-reactivetoolkit';
import {Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {NgplFilterMenuComponent} from '../ngpl-filter-menu/ngpl-filter-menu.component';
import {NGPL_FILTER_APPLIED_BASE, NgplFilterConfigValue} from 'ngpl-common';
import {NgplColumnConfig} from '../base/ngpl-column-config.model';
import {NgplFiltersAppliedComponent} from '../ngpl-filters-applied/ngpl-filters-applied.component';

@UntilDestroy()
@Component({
  selector: 'ngpl-filter-applied',
  templateUrl: './ngpl-filter-applied-value.component.html',
  styleUrls: ['./ngpl-filter-applied-value.component.scss']
})
export class NgplFilterAppliedValueComponent implements OnInit, OnChanges {

  @Input() filterApplied: NgplFilterConfigValue;
  @Changes('filterApplied') filteredApplied$: Observable<NgplFilterConfigValue>;

  @Input() widgetFilterMenu: NgplFilterMenuComponent;

  @Input() customField = null;
  @Changes('customField') customField$: Observable<string>;

  @Input() customValue = null;
  @Changes('customValue') customValue$: Observable<string>;

  field = '';
  value = null;
  datePipe = new DatePipe('en');

  @Input() columnConfig: { [key: string]: NgplColumnConfig } = {};

  constructor( @Optional() @Inject(NGPL_FILTER_APPLIED_BASE) private ngplFilterBase: NgplFiltersAppliedComponent) {
  }

  ngOnInit(): void {
    console.log('this.ngplFilterBase', this.ngplFilterBase);
    this.filteredApplied$
      .pipe(
        untilDestroyed(this),
        tap(f => {
          this.generateInfor(f);
        })
      )
      .subscribe();

    this.customValue$
      .pipe(
        untilDestroyed(this),
        tap(f => {
          this.value = f;
        })
      )
      .subscribe();
    this.customField$
      .pipe(
        untilDestroyed(this),
        tap(f => {
          this.field = f;
        })
      )
      .subscribe();
  }

  generateInfor(f: NgplFilterConfigValue): void {
    this.field = f.title || f.name;
    this.generarValue(f);
  }

  clearFilter(): void {
    this.filterApplied?.parent?.clearFilter();
  }

  generarValue(f: NgplFilterConfigValue): void {
    const config: NgplColumnConfig = this.currentConfig;
    console.log('config', this.columnConfig, config, f);
    if (!config) {
      if (f.subtype === 'date') {
        this.value = this.datePipe.transform(f.value, 'dd/MM/yyyy');
      } else {
        this.value = f.value;
      }
    } else {
      if (!!config.filteredValue) {
        this.value = config.filteredValue(f.value);
      } else {
        this.value = f.value;
      }
    }
  }

  get currentConfig(): NgplColumnConfig {
    const filterColumn = this.filterApplied?.column || this.filterApplied?.name;
    return this.columnConfig[filterColumn];
  }

  ngOnChanges(): void {
  }

  openFilterMenuOption(): void {
    if (!!this.widgetFilterMenu) {
      this.widgetFilterMenu.openPanelWithBackdrop(null);
    }
    if (!!this.filterApplied && !!this.filterApplied.ngplFilterMenu) {
      this.filterApplied.ngplFilterMenu.openPanelWithBackdrop(null);
    }
  }
}
