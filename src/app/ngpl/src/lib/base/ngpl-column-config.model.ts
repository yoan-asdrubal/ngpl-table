export interface NgplTableColumnConfig {
  title?: string;
  columns?: NgplColumnConfig[] | string[] | any[];
  selected?: string[];
}

export interface NgplColumnConfig {
  /** Nombre de la columna usado como identificador,
   * se utilizara como ${titulo} o  @{excelTitulo} en caso de que estas propiedades no se especifiquen
   */
  column?: string;

  /** Se utiliza para mostrar texto en el componente de seleccion de columnas, o para encabezado de columna
   * en caso de que no se especifique  @{excelTitulo}
   */
  title?: string;

  fixed?: boolean;

  /** Define si el filtro debe aplicarse siempre o no, usado principalmente praa listados asociados a periodos
   */
  fixedFilter?: boolean;

  /** Funcion para modificar el valor que se mostrara en los filtros aplicados, se utiliza principalmente
   * para trasnformar valores de fecha o para casos de filtro por id de nomencladores, y mostrar en el filtro aplicado
   * los nombres de los mismos, si se utiliza una funcion implementada en el componente debe bindearse al mismo
   * @example arrow function (filter: any) => filter.toString().toUpperCase()
   * @example utilizando funcion definida en el componente (item: any) => this.myCustomTransformFunction.bind(this)
   */
  filteredValue?: (filterValue) => any | string;

  /** Controla si se exporta o no la columna a excel
   * @default false : se exporta a excel por defecto
   */
  excelSkipExport?: boolean;

  /** Ancho de la columna al ser exportada en el excel */
  excelColumnWidth?: number;

  /** Titulo de la columna en el excel, en caso de no especificarse se utilizara @{titulo} y si esta no se especifica
   * se utilizara @{columna}
   */
  excelTitulo?: string;

  /** Especifica el valor a generar en el excel, puede ser un string especificando la propiedad qeu se desea mostrar o puede ser
   * una funcion que dado un item de la lista transforme ese valor en el formato deseado
   * @example propiedad simple 'rut'
   * @example propiedad anidad en el objetjo 'cnegocio.descripcion'
   * @example funcion (item: any) => item.id.toString().toUpperCase()
   * @example utilizando funcion definida en el componente (item: any) => this.myCustomTransformFunction
   */
  excelValue?: (item) => any | string;

  hideColumn?: boolean;
}

