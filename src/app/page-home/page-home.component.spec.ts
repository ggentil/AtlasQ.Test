import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomeComponent } from './page-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PageHomeComponent', () => {
    let component: PageHomeComponent;
    let fixture: ComponentFixture<PageHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageHomeComponent
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                FormsModule,
                BrowserAnimationsModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Deve criar o component', () => {
        expect(component).toBeTruthy();
    });

    it('Loader precisa ser exibido no começo', () => {
        expect(component.loader).toBeTruthy();
    });

    it("Teste de ordenação por data", async(() => {
        let inicial = [
            {dateMoviment: "2018-11-07 21:51:03"},
            {dateMoviment: "2017-11-07 21:51:03"},
            {dateMoviment: "2019-01-05 14:12:55"}
        ];

        let esperado = [
            {dateMoviment: "2019-01-05 14:12:55"},
            {dateMoviment: "2018-11-07 21:51:03"},
            {dateMoviment: "2017-11-07 21:51:03"}
        ];
            
        expect(component.ordenarColecaoPorData(inicial)).toEqual(esperado);
    }));

    it("Teste de adição e cálculo do saldo", async(() => {
        let inicial = [
            {dateMoviment: "2019-01-05 14:12:55", proft: 5},
            {dateMoviment: "2018-11-07 21:51:03", proft: 10},
            {dateMoviment: "2017-11-07 21:51:03", proft: 15}
        ];

        let esperado = [
            {dateMoviment: "2019-01-05 14:12:55", proft: 5, balance: 30},
            {dateMoviment: "2018-11-07 21:51:03", proft: 10, balance: 25},
            {dateMoviment: "2017-11-07 21:51:03", proft: 15, balance: 15} 
        ];
            
        expect(component.adicionarPropriedadeSaldo(inicial)).toEqual(esperado);
    }));

    it("Teste de filtro por termos", async(() => {
        let inicial = [
            {
                dateMoviment: "2018-11-07 21:51:03",
                coin: "BTC",
                proft: "0.668255",
                profitPercentage: 38
            },
            {
                dateMoviment: "2019-01-05 14:12:55",
                coin: "BTC",
                proft: "2.725550",
                profitPercentage: 35
            },
            {
                dateMoviment: "2018-05-02 05:05:15",
                coin: "BTC",
                proft: "0.613646",
                profitPercentage: 15
            }
        ];

        let esperado = [
            {
                dateMoviment: "2019-01-05 14:12:55",
                coin: "BTC",
                proft: "2.725550",
                profitPercentage: 35
            }
        ]
            
        expect(component.filtrarPorTermo("/19", inicial)).toEqual(esperado);
    }));
});
