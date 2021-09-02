import {Component, OnInit} from '@angular/core';
import {ItemsToMap} from 'ngpl-common';
import {FormControl} from '@angular/forms';
import {NgplTableConfigModel} from '../../ngpl/src/lib/ngpl-table-base/ngpl-table-config.model';
import {NgplBaseTable} from '../../ngpl/src/lib/ngpl-table-base/ngpl-base.table';
import {BaseTableDec} from '../../ngpl/src/lib';
import {Confirmable} from 'ngpl-dialog';

@BaseTableDec()
@Component({
  selector: 'ngpl-datatable-test',
  templateUrl: './ngpl-datatable-test.component.html',
  styleUrls: ['./ngpl-datatable-test.component.scss']
})
export class NgplDatatableTestComponent extends NgplBaseTable<any> implements OnInit {
  searchRutCtrl = new FormControl();

  tableConfig: NgplTableConfigModel = {
    title: 'Listado de empleados',
    columns: [
      {column: 'select', title: 'Seleccionar', fixed: true, excelSkipExport: true},
      {
        column: 'rut', title: 'Rut', fixed: true
      },
      {
        column: 'nombre', title: 'Nombre', excelConfig: {
          width: 60
        }
      },
      {
        column: 'valor', title: 'Valor'
      },
      {
        column: 'cnegocio',
        title: 'Área',
        filterConfig: {
          filteredValue: (value: any[]) => {
            return value.map(v => this.centroNegocioMap[v]?.descripcion || v).join(',');
          }
        },
        excelConfig: {
          value: (item) => this.centroNegocioMap[item.cnegocio]?.descripcion
        }
      },
      {
        column: 'estado', title: 'Estado'
      },
      {
        column: 'movimiento', title: 'Movimiento'
      },
      {column: 'action', title: 'Opciones', fixed: true, excelSkipExport: true}
    ],
    columnSelected: ['select', 'rut', 'nombre', 'movimiento', 'valor', 'cnegocio', 'estado', 'action'], excelConfig: {
      styles: {
        columns: [
          {
            style: {
              alignment: {
                horizontal: 'justify'
              }
            },
            index: ['rut', 'nombre']
          },
          {
            style: {
              alignment: {
                horizontal: 'center'
              }
            },
            index: ['movimiento', 'valor']
          },
          {
            style: {
              alignment: {
                horizontal: 'right'
              }
            },
            index: ['cnegocio', 'estado']
          }
        ],
        rows: [
          {
            style: {
              font: {name: 'Arial', size: 11, underline: false, bold: true, color: {argb: '000000'}},
              fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'CCCCCC'}, bgColor: {argb: 'CCCCCC'}},
              border: {
                left: {
                  style: 'thin'
                }, right: {
                  style: 'dotted'
                }
              }
            },
            index: [1]
          }
        ]
      }
    }
  };
  tiposMovimientosFilter = [];
  opcionesEstado = [];
  @ItemsToMap()
  opcionesEstadoMap = {};

  centroNegocio = [];
  @ItemsToMap()
  centroNegocioMap = {};
  estadoFilter = new FormControl();
  searchMovimientoCtrl = new FormControl();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.centroNegocio = [
      {
        id: 1,
        descripcion: 'CNegocio 1'
      }, {
        id: 2,
        descripcion: 'CNegocio 2'
      }, {
        id: 3,
        descripcion: 'CNegocio 3'
      }
    ];
    this.opcionesEstado = [
      {
        id: 'PROCESADO',
        descripcion: 'PROCESADO'
      },
      {
        id: 'PENDIENTE',
        descripcion: 'PENDIENTE'
      },
      {
        id: 'CANCELADO',
        descripcion: 'PENDIENTE'
      }
    ];
    setTimeout(() => {
      this.initData();
      this.searching = false;
    }, 2500);
  }

  initData(): void {
    this.items = Array(200).fill(1).map((i, index) => {

      return {
        id: index,
        rut: String.getRandomWord(10),
        cnegocio: this.centroNegocio[index % 3].id,
        movimiento: String.getRandomWord(10),
        valor: String.getRandomWord(10),
        estado: this.opcionesEstado[index % 2].id,
        nombre: String.getRandomSentence(3)
      };
    });
  }

  @Confirmable({actionText: 'ELIMINAR'})
  eliminar(items = this.selectedValues()): void {
    this.deselect(items);
    this.items = this.items.filter(i => {
      return !items.some(ii => i.id === ii.id);
    });
  }

  selectFileToImport(e: any): void {
    this.readExcelData(e, 1, 6, 1, 1, this.readedDataExcel);
  }

  readedDataExcel(data: any[]): void {
    console.log('readedDataExcel', data);
  }
}
