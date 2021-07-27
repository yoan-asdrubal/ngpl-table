import {Component, OnInit} from '@angular/core';
import {ItemsToMap} from 'ngpl-common';
import {FormControl} from '@angular/forms';
import {NgplTableConfigModel} from '../../ngpl/src/lib/ngpl-table-base/ngpl-table-config.model';
import {Confirmable} from 'ngpl-dialog';

@Component({
  selector: 'ngpl-table-test',
  templateUrl: './ngpl-table-test.component.html',
  styleUrls: ['./ngpl-table-test.component.scss']
})
export class NgplTableTestComponent implements OnInit {
  searchRutCtrl = new FormControl();

  tableConfig: NgplTableConfigModel = {
    title: 'Listado de empleados',
    columns: [
      {column: 'select', title: 'Seleccionar', fixed: true, excelSkipExport: true},
      {
        column: 'rut', title: 'Rut', fixed: true,
        columnConfig: {
          sortColumn: true
        }
      },
      {
        column: 'nombre', title: 'Nombre',
        columnConfig: {
          sortColumn: true
        },
        excelConfig: {
          width: 60
        }
      },
      {
        column: 'valor', title: 'Valor',
        columnConfig: {
          sortColumn: true
        }
      },
      {
        column: 'cnegocio',
        title: 'Área',
        filterConfig: {
          filteredValue: (value: any[]) => {
            return value.map(v => this.centroNegocioMap[v]?.descripcion || v).join(',');
          }
        },
        columnConfig: {
          value: (item) => this.centroNegocioMap[item.cnegocio]?.descripcion
        },
        excelConfig: {
          value: (item) => this.centroNegocioMap[item.cnegocio]?.descripcion
        }
      },
      {
        column: 'estado', title: 'Estado',
        columnConfig: {
          valueIcon: {
            icon: () => 'check_circle',
            class: (item) => {
              const base = 'mat-18 d-flex mx-auto align-items-center mat-18 pr-3 fs-normal';
              if (item.estado === 'PROCESADO') {
                return base + ' fc-greenblue ';
              }
              return base + ' disabled';
            },
            tooltip: (item) => item?.estado,
            action: (item: any) => console.log(item)
          }
        }
      },
      {
        column: 'movimiento', title: 'Movimiento',
        columnConfig: {
          value: item => `<div class="text-left"> <p> <h1> ${item.movimiento}</h1></p> </div>`
        }
      },
      {column: 'action', title: 'Opciones', fixed: true, excelSkipExport: true}
    ],
    columnSelected: ['select', 'rut', 'nombre', 'valor', 'cnegocio', 'estado', 'movimiento', 'action'],
    excelConfig: {
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
    },
    rowOptions: [
      {
        icon: 'check',
        text: '',
        tooltip: 'Chequear',
        action: (item: any) => alert(item.nombre),
        disableOn: (item: any) => item?.estado === 'CANCELADO',
        iconClass: 'mat-18',
        botonClass: ''
      }
    ],
    rowMenuOptions: [
      {
        icon: 'delete',
        text: 'Eliminar',
        tooltip: 'Eliminar',
        action: (item: any) => this.eliminar([item]),
        disableOn: (item: any) => item?.estado === 'CANCELADO',
        iconClass: 'mat-18',
        botonClass: ''
      },
      {
        icon: 'check',
        text: 'Menu Aler',
        tooltip: 'Alert',
        action: (item: any) => alert(item?.nombre),
        disableOn: (item: any) => item?.estado === 'CANCELADO',
        iconClass: 'mat-18',
        botonClass: ''
      }
    ],
    tableOptions: [
      {
        icon: 'check',
        text: '',
        tooltip: 'Chequear',
        action: (item: any) => alert(item.nombre),
        disableOn: (item: any) => item?.estado === 'CANCELADO',
        iconClass: 'mat-18 ml-3',
        botonClass: ''
      }
    ],
    tableMenuOptions: [
      {
        icon: 'delete',
        text: 'Eliminar',
        tooltip: 'Eliminar',
        action: (item: any) => this.eliminar(this.itemsSelected),
        disableOn: (hasValue) => !hasValue,
        iconClass: 'mat-18',
        botonClass: ''
      },
      {
        icon: 'check',
        text: 'Menu Aler',
        tooltip: 'Alert',
        action: (item: any) => alert(item?.nombre),
        disableOn: (hasValue) => !hasValue,
        iconClass: 'mat-18',
        botonClass: ''
      }
    ]
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

  items = [];
  searching = true;
  itemsFiltered = [];
  itemsSelected = [];

  constructor() {
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
        valor: Math.random() * 1000 + (index % 2 === 0 ? '111' : ''),
        estado: this.opcionesEstado[index % 3].id,
        nombre: String.getRandomSentence(3)
      };
    });
  }

  @Confirmable()
  eliminar(items): void {
    console.log('items', items, Array.isArray(items));
    this.items = this.items.filter(i => {
      return !items.some(ii => i.id === ii.id);
    });
  }

}
