import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplTableTestComponent} from './app-test/ngpl-table-test/ngpl-table-test.component';
import {NgplDatatableTestComponent} from './app-test/ngpl-datatable-test/ngpl-datatable-test.component';

const routes: Routes = [
  {
    path: 'ngpl-datatable',
    component: NgplDatatableTestComponent,
    data: {
      title: 'Datatable Test'
    }
  }, {
    path: 'ngpl-table',
    component: NgplTableTestComponent,
    data: {
      title: 'New Table Test'
    }
  }, {
    path: '**',
    component: NgplTableTestComponent,
    data: {
      title: 'New Table Test'
    }
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
