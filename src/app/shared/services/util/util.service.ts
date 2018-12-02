import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    timeout: any;

    constructor() { }

    converterStringParaAmigavel(str: string): string {
        let mapaAcentosHex: Object = {
            a : /[\xE0-\xE6]/g,
            e : /[\xE8-\xEB]/g,
            i : /[\xEC-\xEF]/g,
            o : /[\xF2-\xF6]/g,
            u : /[\xF9-\xFC]/g,
            c : /\xE7/g,
            n : /\xF1/g
        };

        for(let letra in mapaAcentosHex) {
            let expressaoRegular = mapaAcentosHex[letra];
            str = str.replace(expressaoRegular, letra);
        }

        str = str.toLowerCase().replace(/\?|\!/g, '').replace(/ /g, '-');
        return str;
    };

    debounce(func, wait, immediate?) {
        return function () {
            let context = this, args = arguments;
            let later = function () {
                this.timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !this.timeout;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

}
