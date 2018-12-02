import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    @Output('novaPesquisa') novaPesquisa = new EventEmitter();
    @Input('termoEmPesquisa') termoEmPesquisa: string;

    constructor() { }

    enviarTermo() {
        this.novaPesquisa.emit(this.termoEmPesquisa);
    }

}
