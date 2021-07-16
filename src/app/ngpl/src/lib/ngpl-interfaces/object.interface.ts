export {};

export interface CleanEmptyPropertiesConfig {
  skip?: string[];
}

declare global {
  interface Object {
    getOrDefault(field, defaultValue): any;

    setValueToProp(field, value): any;

    cleanEmptyProperties(config?: CleanEmptyPropertiesConfig): any;

    toBase64(): string;
  }
}
if (!Object.getOrDefault) {
  Object.defineProperty(Object.prototype, 'getOrDefault', {
    value(field , defaultValue = ''): any {
      if (!this) {
        return defaultValue;
      }
      return field.split('.')
        .reduce((result, _field) => result && result[_field], this) || defaultValue;
    }
  });
}

if (!Object.setValueToProp) {
  Object.defineProperty(Object.prototype, 'setValueToProp', {
    value(field, value): any {
      const arrPath = field.split('.');
      const object = Object.assign({}, this);
      if (arrPath.length === 1) {
        object[arrPath[0]] = value;
        return object;
      }
      object[arrPath[0]] = object[arrPath[0]]?.setValueToProp(arrPath.slice(1).join('.'), value);
      return object;
    }
  });
}


if (!Object.cleanEmptyProperties) {
  Object.defineProperty(Object.prototype, 'cleanEmptyProperties', {
    value(config: CleanEmptyPropertiesConfig = {}): any {
      let value = this;
      if (typeof value === 'object' && !Array.isArray(value)) {
        value = Object.assign({}, value);
        Object.keys(value).forEach((key) => {
          const prop = value[key];
          if (!!prop || prop === 0 || prop === 1) {
            if (typeof prop === 'object' &&  !Array.isArray(prop)) {
              value[key] = prop.cleanEmptyProperties();
              if (Object.keys(value[key]).length === 0) {
                delete value[key];
              }
            } else if (Array.isArray(prop)) {
              value[key] = prop.cleanEmptyProperties();
              if ((value[key] as any[]).length === 0) {
                delete value[key];
              }
            } else if (value[key].toString().trim() === '') {
              delete value[key];
            }
          } else {
            delete value[key];
          }
        });
      }
      if (Array.isArray(value)) {
        value = Array.of(...value);
        const newArray = [];
        value.forEach((p, i) => {
          if (typeof p === 'object' && !Array.isArray(p)) {
            value[i] = p.cleanEmptyProperties();

            if (Object.keys(value[i]).length !== 0) {
              newArray.push(value[i]);
            }
          } else if (Array.isArray(p)) {
            value[i] = p.cleanEmptyProperties();
            if ((value[i] as any[]).length !== 0) {
              newArray.push(value[i]);
            }
          } else if (value[i].toString().trim() !== '') {
            newArray.push(value[i]);
          }
        });
        value = newArray;
      }
      return value;
    }
  });
}
if (!Object.toBase64) {
  Object.defineProperty(Object.prototype, 'toBase64', {
    value(): any {
      if (!this) {
        return null;
      }
      let objJsonStr = this;
      if (typeof this !== 'string') {
        objJsonStr = JSON.stringify(this);
      }
      const objJsonB64 = btoa(objJsonStr);

      return objJsonB64;
    }
  });
}

