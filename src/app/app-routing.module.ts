import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplDatatableTestComponent} from './app-test/ngpl-table-test/ngpl-datatable-test.component';

const routes: Routes = [
  {
    path: 'ngpl-datatable',
    component: NgplDatatableTestComponent
  }, {
    path: '**',
    component: NgplDatatableTestComponent
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
