import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { RequestService } from '../shared/services/request/request.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss'],
    animations: [
        trigger('opacity', [
            state('true', style({ 'opacity': 1 })),
            state('false', style({ 'opacity': 0 })),
            transition('* <=> *', animate('.3s ease-in-out'))
        ])
    ]
})
export class PageHomeComponent implements OnInit {

    termoFiltro: string;
    arrLucros: Array<Object>;
    arrLucrosOriginal: Array<Object>;
    loader: boolean = true;

    constructor(private _requestService: RequestService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.buscarDadosIniciais();
    };

    buscarDadosIniciais() {
        this._requestService.requestMethod('http://www.mocky.io/v2/5b2c010d300000100023487a', "GET", true, false)
            .subscribe(response => {
                    if(response.success) {
                        this.arrLucrosOriginal = this.adicionarPropriedadeSaldo(this.ordenarColecaoPorData(response.data));
                        this.arrLucros = this.arrLucrosOriginal;
                    } else {
                        alert('Ocorreu um erro, contacte o administrador ou tente novamente mais tarde.');
                    }
                }, error => console.log(error)).add(() => this.loader = false);
    };

    receberNovoTermoBusca(termo: string) {
        this.loader = true;

        if(termo != this.termoFiltro) {
            this.termoFiltro = termo;
            this.arrLucros = !termo ? this.arrLucrosOriginal : this.filtrarPorTermo(termo, this.arrLucrosOriginal);
        }

        setTimeout(() => {
            this.loader = false;
        }, 800);
    };
 
    ordenarColecaoPorData(arrLucros: Array<any>): Array<any> {
        return arrLucros.sort(function(a,b){
            let foo1: any = new Date(b.dateMoviment),
                foo2: any = new Date(a.dateMoviment);

            return foo1 - foo2;
        });
    };

    adicionarPropriedadeSaldo(arrLucros: Array<any>): Array<any> {
        for (let i = arrLucros.length - 1; i >= 0; i--) {
            if(i == arrLucros.length - 1) {
                arrLucros[i].balance = arrLucros[i].proft;
            } else if (arrLucros[i + 1]) {
                arrLucros[i].balance = parseFloat(arrLucros[i + 1].balance) + parseFloat(arrLucros[i].proft);
                arrLucros[i].balance = arrLucros[i].balance.toString();
            }
        };

        return arrLucros;
    };

    filtrarPorTermo(termo: string, arrLucros: Array<any>): Array<any> {
        return arrLucros.filter(obj => {
            let date = this.datePipe.transform(obj.dateMoviment, 'dd/MM/yy HH:mm');

            if(obj.balance.indexOf(termo) >= 0 ||
               obj.coin.indexOf(termo) >= 0 ||
               date.indexOf(termo) >= 0 ||
               obj.profitPercentage.toString().indexOf(termo) >= 0 ||
               obj.proft.indexOf(termo) >= 0) {
                  return obj;
            }
        });
    };
}