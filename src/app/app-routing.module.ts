import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplYearPickerTestComponent} from './app-test/ngpl-year-picker-test/ngpl-year-picker-test.component';

const routes: Routes = [
  {
    path: 'ngpl-year-picker',
    component: NgplYearPickerTestComponent
  }, {
    path: '**',
    component: NgplYearPickerTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
