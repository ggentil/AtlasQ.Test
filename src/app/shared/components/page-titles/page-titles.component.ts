import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-titles',
    template: `
        <h1 *ngIf="title">{{ title }}</h1>
        <span *ngIf="subtitle">{{ subtitle }}</span>
    `,
    styleUrls: ['./page-titles.component.scss']
})
export class PageTitlesComponent {

    @Input() title: string;
    @Input() subtitle: string;

    constructor() { }
}
