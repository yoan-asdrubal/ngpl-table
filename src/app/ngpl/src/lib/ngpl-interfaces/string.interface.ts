declare global {
  interface String {
    replaceAll(search, replacement, keepCase): string;

    isEmpty(): boolean;

    getRandomWord(size: number): string;

    getRandomSentence(words: number): string;

    getRandomWords(sizes: number[]): string[];

    base64ToObj(): string;
  }
}

if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function (): boolean {
    const target = String(this);
    return target.length === 0;
  };
}
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (search: string, replacement: string, keepCase = false): any {
    const target = String(this);

    if (!target) {
      return '';
    }

    if (!search || !replacement || search.isEmpty() || replacement.isEmpty()) {
      return target;
    }
    const expresion = new RegExp(keepCase ? search : search.toLowerCase(), 'g');
    if (keepCase) {
      return target.replace(expresion, replacement);
    }
    return target.toLowerCase().replace(expresion, replacement);
    // return target.split(search).join(replacement);
  };
}
if (!String.prototype.getRandomWord) {
  String.prototype.getRandomWord = function (size): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  };
}

if (!String.prototype.getRandomSentence) {
  String.prototype.getRandomSentence = function (words: number): string {
    return Array(words).fill(1).map(s => this.getRandomWord(8)).join(' ');
  };
}
if (!String.prototype.getRandomWords) {
  String.prototype.getRandomWords = function (sizes: number[]): string[] {
    return sizes.map(s => this.getRandomWord(s));
  };
}
if (!String.prototype.base64ToObj) {
  String.prototype.base64ToObj = function (): any {

    const objB64toObje = atob(this);

    const obj = JSON.parse(objB64toObje);

    return obj;
  };
}

declare global {
  interface StringConstructor {

    getRandomWord(size: number): string;

    getRandomSentence(words: number): string;

    getRandomWords(sizes: number[]): string[];
  }
}
if (!String.getRandomWord) {
  String.getRandomWord = function (size): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  };
}

if (!String.getRandomSentence) {
  String.getRandomSentence = function (words: number): string {
    return Array(words).fill(1).map(s => this.getRandomWord(8)).join(' ');
  };
}
if (!String.getRandomWords) {
  String.getRandomWords = function (sizes: number[]): string[] {
    return sizes.map(s => this.getRandomWord(s));
  };
}
export {};
