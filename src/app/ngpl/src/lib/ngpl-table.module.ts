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

const components = [
  NgplDatatableComponent,
  NgplFiltersAppliedComponent,
  NgplFilterMenuComponent,
  NgplFilterAppliedValueComponent,
  NgplColumnSelectorComponent
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
    OverlayModule,
    NgplCommonModule,
    NgplFilterModule,
    NgplCommonDirectivesModule
  ]
})
export class NgplTableModule {
}
