import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { PageHomeComponent } from './page-home/page-home.component';


const APP_ROUTES: Routes = [
    { path: '', component: PageHomeComponent },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);