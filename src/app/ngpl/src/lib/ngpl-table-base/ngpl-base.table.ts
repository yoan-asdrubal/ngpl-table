/**
 *  Definir metodos bases para interactuar con la tabla, el filtro y la seleccion de columnas
 */
import {NgplColumnConfig, NgplTableColumnConfig} from './ngpl-column-config.model';
import {NgplSelection} from 'ngpl-common';

export class NgplBaseTable<T extends any> extends NgplSelection<T> {

    items: T[];

    itemsFiltered: T[];

    displayColumns: string[] = [];

    searching = true;

    /**
     * Utilizado para configurar las columnas de la tabla y su funcionamiento en la seleccion
     * de columnas y al exportar los datos a un excel
     */
    columnConfig: NgplTableColumnConfig = {};

    columnConfigMap: { [key: string]: NgplColumnConfig } = {};

    constructor(key: string = 'id') {
        super(key);
    }

    /**
     * Metodo para generar un mapa de datos con la configuracion de las columnas basado en la configuracion inicial
     * utilizado para acceder a una configuracion especifica sin necesidad de hacer una busqueda sobre el arreglo de columnas
     */
    generarColumnConfigMap(): void {
        // @ts-ignore
        this.columnConfigMap = this.columnConfig.columns.reduce((prev, curr: DfColumnModel) => {
            const key: any = curr.column || curr;
            return {...prev, [key]: curr};
        }, {});
    }

    /**
     * Exporta excel basado en la configuracion de columnas y las columnas especificadas por parametro
     * @param columnas : por defecto las columnas seleccionadas para mostrar en la tabla
     * @param nombreFichero : nombre del documnto que se desea exportar
     */
}
