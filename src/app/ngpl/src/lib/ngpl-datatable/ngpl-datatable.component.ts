/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  11/6/2019
 *
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {Changes} from 'ngx-reactivetoolkit';
import {merge, ReplaySubject} from 'rxjs';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NgplFilterConfigDirective, NgplFilterConfigValue, NgplFilterService} from 'ngpl-filter';

@UntilDestroy()
@Component({
  selector: 'ngpl-datatable',
  templateUrl: './ngpl-datatable.component.html',
  styleUrls: ['./ngpl-datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ngplDatatable'
})
export class NgplDatatableComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  @Input() items: any[];
  @Changes('items') items$;

  filterConfig: { [key: string]: NgplFilterConfigValue } = {};
  filterConfig$ = new ReplaySubject(1);
  filteredItem$ = new ReplaySubject(1);
  @Output() filterApplied: EventEmitter<NgplFilterConfigValue[]> = new EventEmitter<NgplFilterConfigValue[]>();

  @ContentChild(MatTable, {static: true}) matTable: MatTable<any>;
  @ContentChild(MatPaginator, {static: true}) matPaginator: MatPaginator;
  @ContentChild(MatSort, {static: true}) matSort: MatSort;
  @ContentChildren(NgplFilterConfigDirective, {descendants: true}) filters: QueryList<NgplFilterConfigDirective>;
  @Input()
  sortingDataAccessor: (item, property) => string | number = null;

  dataSource = new MatTableDataSource<any>([null, null, null, null, null]);


  @Input() searching = false;
  @Changes('searching') searching$;
  @Output() searchingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemFilteredChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() showSkeleton = true;
  @Input() firstLoad = false;
  private skeletonValues = [null, null, null, null, null];

  /**
   * Especifica la configuracion del pageSize para el paginator en caso de existir, por defecto es 10
   */
  @Input() pageSize = 5;

  /**
   * Especifica la configuracion del pageSizeOptions para el paginator en caso de existir, por defecto es  [5, 10, 20, 50]
   */
  @Input() pageSizeOptions = [5, 10, 20, 50];

  @Input() columns;

  hasFilterApplied = false;

  prevPage = 0;
  prevSize = 0;

  constructor(private ngplFilterService: NgplFilterService) {
  }

  ngOnInit(): void {
    if (this.showSkeleton !== true) {
      this.initDatasource([]);
    } else if (this.matTable) {
      this.matTable.dataSource = this.dataSource;
    }


    this.searching$
      .pipe(
        untilDestroyed(this),
        // tap((val: any) => {
        // 	console.log('searching$', val);
        // }),

        // filter(value => value === true),
        tap((value) => {
          if (!!value) {
            if (this.showSkeleton !== true) {
              this.initDatasource([]);
            } else {
              this.initDatasource(this.skeletonValues);
            }
          } else {
            const result = this.ngplFilterService.filter(this.items, this.filterConfig);
            this.filteredItem$.next(result);
          }
        })
      )
      .subscribe();

    this.filteredItem$
      .pipe(
        untilDestroyed(this),
        // tap((val: any) => {
        // 	console.log('filteredItem$', this.firstLoad, val);
        // }),
        tap((data: any[]) => {
          if (this.matTable) {
            if (!this.firstLoad) {
              this.initDatasource(data);
            } else {
              this.firstLoad = false;
            }
          }
          this.searching = false;
          this.searchingChange.emit(false);
          this.itemFilteredChange.emit(data);
        })
      )
      .subscribe();

    this.filterConfig$
      .pipe(
        untilDestroyed(this),
        tap((val: any) => {
          // console.log('filterConfig$', val, this.items);
        }),
        tap((filt: any) => {
          this.filterConfig = filt;
          if ((!!this.items && this.items.length > 0) || this.searching === false) {
            const result = this.ngplFilterService.filter(this.items, filt);
            this.filteredItem$.next(result);
          }
        })
      )
      .subscribe();
    this.items$
      .pipe(
        untilDestroyed(this),
        tap((val: any) => {
          // console.log('items$', this.searching, val, this.filterConfig);
        }),
        tap(() => {
          if ((!!this.items && this.items.length > 0) || !this.searching) {
            const result = this.ngplFilterService.filter(this.items, this.filterConfig);
            this.filteredItem$.next(result);
          }
        })
      )
      .subscribe();
    if (!!this.matPaginator) {
      this.matPaginator.page
        .pipe(untilDestroyed(this),
          tap((page: any) => {
            // console.log('matPaginator.page', page);
            if (!this.searching) {
              this.prevPage = page.pageIndex;
            }
            this.pageSize = page.pageSize;
          }))
        .subscribe();
    }
  }

  initDatasource(items: any[]): void {
    // console.log({'this.prevSize': this.prevSize});
    // console.log({'this.searching': this.searching});
    // console.log({'items.length': items.length});

    this.dataSource = new MatTableDataSource(items);
    this.dataSource.paginator = this.matPaginator;
    if (this.matSort && items[0] !== null) {
      this.dataSource.sort = this.matSort;
    }
    if (this.sortingDataAccessor) {
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    } else {
      this.dataSource.sortingDataAccessor = this.defaultSortingDataAccesor;
    }
    if (this.dataSource.paginator && items[0] !== null) {
      this.dataSource.paginator.length = items.length;
      this.dataSource.paginator.pageSize = this.pageSize;
      this.dataSource.paginator.pageSizeOptions = this.pageSizeOptions;
      // console.log(
      //   'prevPage:', this.prevPage,
      //   'items:', items.length,
      //   'pageSize:', this.dataSource.paginator.pageSize,
      //   'pageIndex:', this.dataSource.paginator.pageIndex,
      //   'compare1:', (this.prevPage + 0) * this.dataSource.paginator.pageSize,
      //   'compare2:', (this.prevPage + 1) * this.dataSource.paginator.pageSize,
      //
      // );
      if (items.length % this.dataSource.paginator.pageSize === 0 && this.prevPage >= items.length / this.dataSource.paginator.pageSize) {
        this.prevPage = items.length / this.dataSource.paginator.pageSize - 1;
      }

      if (this.prevPage > -1 && items.length >= (this.prevPage + 0) * this.dataSource.paginator.pageSize) {
        this.dataSource.paginator.pageIndex = this.prevPage;
      } else {
        this.dataSource.paginator.firstPage();
      }
    }
    if (this.matTable) {
      this.matTable.dataSource = this.dataSource;
    }
    if (this.matSort && items[0] !== null) {
      this.matSort.sortChange.emit();
    }
    if (!!this.dataSource.data[0]) {
      this.prevSize = items.length;
    }
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
  }


  ngAfterContentInit(): void {

    const localFilters = merge(...this.filters.map(item => item.filter));
    localFilters
      .pipe(
        untilDestroyed(this),
        filter(value => value !== null && value !== undefined),
        tap(value => {
            this.updateFilterConfig({[value.name]: value});
          }
        ),
        tap(() => {
          this.emitFilterConfig();
        })
      )
      .subscribe();
  }

  defaultSortingDataAccesor(item: any, property: any): any {
    if (!item) {
      return '';
    }
    const value = item[property];
    if (!isNaN(value)) {
      return +value;
    }
    return item[property];
  }

  registerFilter(filterConfig: NgplFilterConfigDirective): void {
    const config = filterConfig.ngplFilterConfig;

    const newValue = config.value || (!!this.filterConfig[config.name] ? this.filterConfig[config.name].value : null);

    filterConfig.ngplFilterConfig = {...config, value: newValue};

    filterConfig.filter.pipe(
      untilDestroyed(this),
      takeUntil(filterConfig.destroyIt$),
      // skip(1),
      filter(value => value !== null && value !== undefined),
      tap((value: NgplFilterConfigValue) => {
          // console.log('FilterConfigValue', value);
          this.updateFilterConfig({[value.name]: value});
        }
      ),
      tap(() => {
        this.emitFilterConfig();
      })
    )
      .subscribe();


    if (!!(!!this.filterConfig[config.name] ? this.filterConfig[config.name].value : null)) {
      // console.log('register value', newValue);
      filterConfig.updateValue(newValue);
    }

    filterConfig.destroyIt$
      .pipe(
        take(1),
        tap((value: NgplFilterConfigValue) => {
          if (!!this.columns && this.columns.indexOf(config.column || config.name) < 0) {
            delete this.filterConfig[value.name];
          }
        })
      )
      .subscribe();
  }

  updateFilterConfig(value): void {
    this.filterConfig = Object.assign({}, this.filterConfig, value);
  }

  emitFilterConfig(value = null): void {
    if (!!value) {
      this.updateFilterConfig(value);
    }
    this.filterConfig$.next(this.filterConfig);
    this.filterApplied.emit(Object.values(this.filterConfig));
    this.checkHasFilterApplied();
  }

  clearFilter(): void {
    Object.values(this.filterConfig).forEach((f: NgplFilterConfigValue) => f.parent.clearFilter());
  }

  checkHasFilterApplied(): void {
    this.hasFilterApplied = !!Object.values(this.filterConfig)
      .find((f: NgplFilterConfigValue) => {
        return f.value !== null && f.value !== undefined;
      });
  }
}
