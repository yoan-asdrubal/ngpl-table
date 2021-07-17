import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplTableTestComponent} from './app-test/ngpl-table-test/ngpl-table-test.component';
import {NgplDatatableTestComponent} from './app-test/ngpl-datatable-test/ngpl-datatable-test.component';

const routes: Routes = [
  {
    path: 'ngpl-datatable',
    component: NgplDatatableTestComponent
  }, {
    path: 'ngpl-table',
    component: NgplTableTestComponent
  }, {
    path: '**',
    component: NgplTableTestComponent
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
