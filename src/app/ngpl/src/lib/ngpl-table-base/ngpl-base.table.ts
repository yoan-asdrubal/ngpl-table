/**
 *  Definir metodos bases para interactuar con la tabla, el filtro y la seleccion de columnas
 */
import {NgplTableColumnConfig, NgplTableConfigModel} from './ngpl-table-config.model';
import {NgplSelection} from 'ngpl-common';
import * as ExcelProper from 'exceljs';
import {Cell, Worksheet} from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs';

export class NgplBaseTable<T extends any> extends NgplSelection<T> {

  items: T[];

  itemsFiltered: T[];

  displayColumns: string[] = [];

  searching = true;

  /**
   * Utilizado para configurar las columnas de la tabla y su funcionamiento en la seleccion
   * de columnas y al exportar los datos a un excel
   */
  tableConfig: NgplTableConfigModel = {};

  columnConfigMap: { [key: string]: NgplTableColumnConfig } = {};

  constructor(key: string = 'id') {
    super(key);
  }

  /**
   * Metodo para generar un mapa de datos con la configuracion de las columnas basado en la configuracion inicial
   * utilizado para acceder a una configuracion especifica sin necesidad de hacer una busqueda sobre el arreglo de columnas
   */
  generarColumnConfigMap(): void {
    // @ts-ignore
    this.columnConfigMap = this.tableConfig.columns.reduce((prev, curr: DfColumnModel) => {
      const key: any = curr.column || curr;
      return {...prev, [key]: curr};
    }, {});
  }


  /**
   * Exporta excel basado en la configuracion de columnas y las columnas especificadas por parametro
   * @param columns : por defecto las columnas seleccionadas para mostrar en la tabla
   * @param nombreFichero : nombre del documnto que se desea exportar
   */
  generateAndDownloadExcel(
    config: Partial<{
      items,
      columns,
      docName,
      workbook,
      sheetName,
      sheetStyleFn
    }> = {
      items: this.hasValue() ? this.selectedValues() : this.itemsFiltered,
      columns: this.displayColumns,
      docName: 'Documento',
      workbook: this.createWorkbook(),
      sheetName: 'DATA',
      sheetStyleFn: null
    }
  ): void {

    const workbook = this.generateExcel(config);
    this.downloadExcel(workbook, config.docName);

  }

  /**
   * Exporta excel basado en la configuracion de columnas y las columnas especificadas por parametro
   * @param columns : por defecto las columnas seleccionadas para mostrar en la tabla
   * @param nombreFichero : nombre del documnto que se desea exportar
   */
  generateExcel(
    config: Partial<{
      items,
      columns,
      docName,
      workbook,
      sheetName,
      sheetStyleFn
    }> = {
      items: this.hasValue() ? this.selectedValues() : this.itemsFiltered,
      columns: this.displayColumns,
      docName: 'Documento',
      workbook: this.createWorkbook(),
      sheetName: 'DATA',
      sheetStyleFn: null
    }
  ): ExcelProper.Workbook {
    const {
      items,
      columns,
      workbook,
      sheetName,
      sheetStyleFn
    } = config;
    this.addWorkSheet(workbook, sheetName);

    /** Se descartan las columnas marcadas como skipExcelExport: true */
    const columnToExport = columns.filter(c => !this.columnConfigMap[c].excelSkipExport);

    const sheet = workbook.getWorksheet(sheetName);

    const columnConfigToExport = columnToExport.map(c => this.columnConfigMap[c]);

    sheet.columns = this.generarExcelColumnHeader(columnConfigToExport);

    sheet.addRows(this.generateExcelData(items, columnConfigToExport));

    if (!!sheetStyleFn && typeof sheetStyleFn === 'function') {
      sheetStyleFn(sheet);
    }

    /**
     * Asignar dataValidation para las columnas que lo tengan configurados
     */
    columnConfigToExport
      .filter(c => !!c.excelConfig?.dataValidation)
      .forEach(c => {
        sheet.getColumnKey(c.column)
          .eachCell((cell: Cell, rowNumber: number) => {
            cell.dataValidation = c.excelConfig.dataValidation;
          });
      });

    this.generateExcelColumnStyles(sheet);

    columnConfigToExport
      .filter(c => !!c.excelConfig?.style)
      .forEach(c => {
        sheet.getColumnKey(c.column)
          .eachCell((cell: Cell, rowNumber: number) => {
            cell.style = c.excelConfig.style;
          });
      });

    this.generateExcelRowStyles(sheet);

    return workbook;
  }

  downloadExcel(workbook: ExcelProper.Workbook, docName = 'DATA'): void {
    workbook.xlsx.writeBuffer().then(dataw => {
      const blob = new Blob([dataw], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
      const fileN = `${docName}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileN;
      anchor.click();
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        window.URL.revokeObjectURL(url);
      }, 0);
    });
  }

  createWorkbook(): ExcelProper.Workbook {
    const workbook: ExcelProper.Workbook = new Excel.Workbook();
    workbook.creator = 'Web';
    workbook.lastModifiedBy = 'Web';
    workbook.created = new Date();
    workbook.modified = new Date();
    return workbook;
  }

  addWorkSheet(workbook: ExcelProper.Workbook, fileName: string): void {
    workbook.addWorksheet(fileName, {
      views: [
        {
          activeCell: 'A1',
          showGridLines: true
        }
      ]
    });
  }

  generarExcelColumnHeader(columns: NgplTableColumnConfig[]): Array<any> {
    return columns.map(c => ({
      key: c.column, width: c.getOrDefault('excelConfig.width', 20), header: c.getOrDefault('excelConfig.header', c.title || c.column)
    })) as Array<any>;

  }

  generateExcelData(items: T[], columns: NgplTableColumnConfig[]): any[] {

    return items.map((item: any) => (
      columns.map(c => {
        const excelValue = c.getOrDefault('excelConfig.value', c.column || c);
        const tipo = typeof excelValue;

        if (tipo === 'function') {
          return excelValue(item);
        }
        return item.getOrDefault(excelValue, '');
      })
    ));
  }

  generateExcelColumnStyles(sheet: Worksheet): void {
    const excelStylesConfig = this.tableConfig?.excelConfig?.styles?.columns || [];
    excelStylesConfig.forEach(e => {
      e.index
        .filter(c => !!sheet.getColumnKey(c))
        .forEach(c => {
          sheet.getColumnKey(c)
            .eachCell((cell: Cell, rowNumber: number) => {
              cell.style = {...cell.style, ...e.style};
            });
        });
    });
  }


  generateExcelRowStyles(sheet: Worksheet): void {
    const excelStylesConfig = this.tableConfig?.excelConfig?.styles?.rows || [];
    excelStylesConfig.forEach(e => {
      e.index
        .filter(r => !!sheet.getRow(r))
        .forEach(r => {
          sheet.getRow(r)
            .eachCell((cell: Cell, rowNumber: number) => {
              cell.style = {...cell.style, ...e.style};
            });
        });
    });
  }
}

