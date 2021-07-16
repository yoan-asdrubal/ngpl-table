import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {NGPL_FILTER_APPLIED_BASE, NgplFilterAppliedBase, NgplFilterConfigDirective, NgplFilterConfigValue} from 'ngpl-filter';
import {NgplColumnConfig} from '../ngpl-table-base/ngpl-table-config.model';

@UntilDestroy()
@Component({
  selector: 'ngpl-filters-applied',
  templateUrl: './ngpl-filters-applied.component.html',
  styleUrls: ['./ngpl-filters-applied.component.scss'],
  exportAs: 'ngplFiltersApplied',
  providers: [
    {
      provide: NGPL_FILTER_APPLIED_BASE, useExisting: forwardRef(() => NgplFiltersAppliedComponent)
    }
  ]
})
export class NgplFiltersAppliedComponent implements OnInit, NgplFilterAppliedBase {
  filterConfig: { [key: string]: NgplFilterConfigValue } = {};
  filteredApplied: NgplFilterConfigValue[] = [];

  @Input() columnConfig: { [key: string]: NgplColumnConfig } = {};

  @Input() columns;

  @Output() filterConfigEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterAppliedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  registerFilter(filterConfig: NgplFilterConfigDirective): void {
    console.log('registerFilter', filterConfig);

    const config = filterConfig.ngplFilterConfig;

    const newValue = config.value || (!!this.filterConfig[config.name] ? this.filterConfig[config.name].value : null);

    filterConfig.ngplFilterConfig = {...config, value: newValue};

    filterConfig.filter.pipe(
      untilDestroyed(this),
      takeUntil(filterConfig.destroyIt$),
      filter(value => value !== null && value !== undefined),
      tap((value: NgplFilterConfigValue) => {
          this.filterConfig = Object.assign({},
            this.filterConfig,
            {[value.name]: value}
          );
        }
      ),
      tap(() => {
        this.filteredApplied = Object.values(this.filterConfig)
          .filter(f => !!f.value || typeof f.value === 'boolean' || typeof f.value === 'number');
        this.emitFilterConfig();
      })
    )
      .subscribe();
    filterConfig.destroyIt$
      .pipe(
        take(1),
        tap((value: NgplFilterConfigValue) => {
          if (!!this.columns && this.columns.indexOf(config.column || config.name) < 0) {
            delete this.filterConfig[value.name];
            this.emitFilterConfig();
          }
        })
      )
      .subscribe();

  }

  emitFilterConfig(): void {
    this.filterConfigEvent.emit(this.filterConfig);
    this.filterAppliedEvent.emit(this.filteredApplied);
  }
}
