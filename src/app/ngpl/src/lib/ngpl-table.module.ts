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
import {NgplYearPickerComponent} from './ngpl-year-picker/ngpl-year-picker.component';

const components = [
  NgplYearPickerComponent
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
    OverlayModule,
    NgplCommonModule,
    NgplCommonDirectivesModule
  ]
})
export class NgplTableModule {
}
