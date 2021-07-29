import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgplCommonDirectivesModule, NgplCommonModule} from 'ngpl-common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgplColumnSelectorComponent} from './ngpl-column-selector/ngpl-column-selector.component';
import {NgplDatatableComponent} from './ngpl-datatable/ngpl-datatable.component';
import {NgplFiltersAppliedComponent} from './ngpl-filters-applied/ngpl-filters-applied.component';
import {NgplFilterMenuComponent} from './ngpl-filter-menu/ngpl-filter-menu.component';
import {NgplFilterAppliedValueComponent} from './ngpl-filter-applied-value/ngpl-filter-applied-value.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgplFilterModule} from 'ngpl-filter';
import {NgplTableComponent} from './ngpl-table/ngpl-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgplFieldModule} from 'ngpl-field';
import {NgplSelectModule} from 'ngpl-select';
import {NgplSelectMultipleModule} from 'ngpl-select-multiple';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

const components = [
  NgplDatatableComponent,
  NgplFiltersAppliedComponent,
  NgplFilterMenuComponent,
  NgplFilterAppliedValueComponent,
  NgplColumnSelectorComponent,
  NgplTableComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    OverlayModule,
    NgplCommonModule,
    NgplFilterModule,
    NgplFieldModule,
    NgplSelectModule,
    NgplSelectMultipleModule,
    NgplCommonDirectivesModule
  ]
})
export class NgplTableModule {
}
