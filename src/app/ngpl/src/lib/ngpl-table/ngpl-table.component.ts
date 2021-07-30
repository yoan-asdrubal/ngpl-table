import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgplTableConfigModel} from '../ngpl-table-base/ngpl-table-config.model';
import {NgplBaseTable} from '../ngpl-table-base/ngpl-base.table';
import {BaseTableDec} from '../ngpl-table-decorators/base-table-dec';
import {Changes} from 'ngx-reactivetoolkit';
import {Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {tap} from 'rxjs/operators';

@UntilDestroy()
@BaseTableDec()
@Component({
  selector: 'ngpl-table',
  templateUrl: './ngpl-table.component.html',
  styleUrls: ['./ngpl-table.component.scss']
})
export class NgplTableComponent extends NgplBaseTable<any> implements OnInit, OnChanges {

  @Input() items = [];
  @Changes('items') items$: Observable<any[]>;

  @Input() tableConfig: NgplTableConfigModel;
  @Changes('tableConfig') tableConfig$: Observable<NgplTableConfigModel>;

  @Input() sortingDataAccessor: (item: any, property: any) => any;

  @Input() searching;

  @Output() itemSelectedEvent = new EventEmitter();
  @Output() itemFilteredEvent = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.tableConfig$
      .pipe(
        untilDestroyed(this),
        tap(() => this.generarColumnConfigMap())
      )
      .subscribe();
    this.items$
      .pipe(
        untilDestroyed(this),
        tap((items) => this.updateSelectedIfNotFound(items))
      )
      .subscribe();

    this.selectionChange
      .pipe(
        untilDestroyed(this),
        tap(event => this.itemSelectedEvent.emit(event))
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
