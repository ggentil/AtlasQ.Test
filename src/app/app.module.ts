// ANGULAR ROOT IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// OTHER IMPORTS
import { NgxMaskModule } from 'ngx-mask';

// COMPONENTS
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { PageHomeComponent } from './page-home/page-home.component';

// ROUTES
import { routing } from './app.routing';

// SERVICES
import { RequestService } from './shared/services/request/request.service';
import { UtilService } from './shared/services/util/util.service';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { PageTitlesComponent } from './shared/components/page-titles/page-titles.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    PageHomeComponent,
    SideBarComponent,
    PageTitlesComponent,
    SearchBarComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
      RequestService,
      UtilService
    ],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule { }

