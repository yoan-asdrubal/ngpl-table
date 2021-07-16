import {NgplBaseTable} from '../ngpl-table-base/ngpl-base.table';

export const generateConfigMethod = 'generarColumnConfigMap';

export function BaseTableDec(): ClassDecorator {
  return (type: any) => {
    if (!(type.prototype instanceof NgplBaseTable)) {
      throw Error('Debe extender de la clase NgplBaseTable');
    }

    decorateNgOnInitOnComponent(type);
  };
}

export function decorateNgOnInitOnComponent<T>(type: any): void {
  type.prototype.ngOnInit = decorateNgOnInit(type.prototype.ngOnInit);
}

export function decorateNgOnInit(
  ngOnInit: (() => void) | null | undefined
): any {
  return function(this: any) {
    // Invoke the original `ngOnDestroy` if it exists
    // tslint:disable-next-line:no-unused-expression
    ngOnInit && ngOnInit.call(this);
    // console.log(this);
    if (this[generateConfigMethod]) {
      this[generateConfigMethod].call(this);
    }
  };
}
