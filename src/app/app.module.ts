import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
// // import { MatModule } from './app.material';
// import { CanalCommunicationService } from './pages/parametres/canal-communication/canal-communication.service';
// // import { MotifOppositionService } from './pages/parametres/motifOpposition/motif.opposition.service';
// // import { MillesimeService } from './pages/parametres/millesime/millesime.service';
// // import { ConventionService } from './pages/parametres/convention/convention.service';

import { ExportAsModule } from 'ngx-export-as';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { authGuardGuard } from './pages/login/auth-guard.guard';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {MyHttpInterceptor} from './pages/login/http-interceptor';
import {ToastrService} from 'ngx-toastr';
import { AppconfigService } from './pages/services/appconfig.service';
import { UserService } from './pages/services/User.service';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

import * as $ from 'jquery';

import { FormsModule }   from '@angular/forms';

import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment.prod';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ClotureManuelComponent } from './pages/cloture/reconciliation/cloture-manuel/cloture-manuel.component';
import { MatNativeDateModule } from '@angular/material/core';


export function momentAdapterFactory() {
  return adapterFactory(moment);
};


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    //  AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    // }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    routing,
    HttpClientModule,
    ExportAsModule,
    ToastrModule.forRoot(),
    CommonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: environment.language
  }),
  ],
  providers: [
    AppSettings,
    UserService,
    ToastrService,
    { provide: LOCALE_ID, useValue: environment.language }, 
     authGuardGuard,    
     { provide: HTTP_INTERCEPTORS,
       useClass: MyHttpInterceptor,
        multi: true },
    AppconfigService,
    {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppconfigService,HttpClient],
    useFactory: AppConfigurationFactory,
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
   // ClotureManuelComponent
  ]
})
export class AppModule { }
export function AppConfigurationFactory(
  appConfig: AppconfigService) {
    return () => appConfig.loadAppConfig();
  }
  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

