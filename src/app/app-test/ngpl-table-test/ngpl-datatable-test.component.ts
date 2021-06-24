import {Component, OnInit} from '@angular/core';
import {ItemsToMap} from 'ngpl-common';
import {FormControl} from '@angular/forms';
import {NgplTableColumnConfig} from '../../ngpl/src/lib/base/ngpl-column-config.model';
import {NgplBaseTable} from '../../ngpl/src/lib/base/ngpl-base.table';

@Component({
  selector: 'ngpl-table-test',
  templateUrl: './ngpl-datatable-test.component.html',
  styleUrls: ['./ngpl-datatable-test.component.scss']
})
export class NgplDatatableTestComponent extends NgplBaseTable<any> implements OnInit {
  searchRutCtrl = new FormControl();

  columnConfig: NgplTableColumnConfig = {
    title: 'Listado de empleados',
    columns: [
      {column: 'select', title: 'Seleccionar', fixed: true},
      {column: 'rut', title: 'Rut', fixed: true},
      {column: 'nombre'},
      {column: 'valor', title: 'Valor'},
      {
        column: 'cnegocio',
        title: 'Área',
        filteredValue: (value: any[]) => {
          console.log('value', value);
          console.log('this.centroNegocioMap', this.centroNegocioMap);
          return value.map(v => this.centroNegocioMap[v]?.descripcion || v).join(',');
        }
      },
      {column: 'estado', title: 'Estado'},
      {column: 'movimiento', title: 'Movimiento'},
      {column: 'accion', title: 'Opciones', fixed: true}
    ],
    selected: ['select', 'rut', 'nombre', 'movimiento', 'valor', 'estado', 'accion']
  };
  tiposMovimientosFilter = [];
  opcionesEstado = [];
  centroNegocio = [];
  @ItemsToMap()
  centroNegocioMap = {};
  estadoFilter = new FormControl();
  searchMovimientoCtrl = new FormControl();

  constructor() {
    super();
    this.generarColumnConfigMap();
  }

  ngOnInit(): void {
    this.centroNegocio = [
      {
        id: 1,
        descripcion: 'CNegocio 1'
      }, {
        id: 2,
        descripcion: 'CNegocio 2'
      }
    ];
    this.opcionesEstado = [
      {
        id: 'OK',
        descripcion: 'OK'
      },
      {
        id: 'PENDIENTE',
        descripcion: 'PENDIENTE'
      }
    ];
    setTimeout(() => {
      this.initData();
      this.searching = false;
    }, 2500);
  }

  initData(): void {
    this.items = Array(55).fill(1).map((i, index) => {

      return {
        id: i,
        rut: String.getRandomWord(10),
        cnegocio: this.centroNegocio[index % 2].id,
        movimiento: String.getRandomWord(10),
        valor: String.getRandomWord(10),
        estado: this.opcionesEstado[index % 2].id,
        nombre: String.getRandomSentence(3)
      };
    });
  }

  eliminar(item): void {
    this.items = this.items.filter(i => i.rut !== item.rut);
  }

  eliminarAll(): void {
    this.items = [];
  }

}
