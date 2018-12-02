import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

    termoFiltro: string;

    constructor() { }

    receberNovoTermoBusca(termo) {
        console.log('Novo termo recebido: ', termo);
    }
}