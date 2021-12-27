import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from '../theme/pipes/pipes.module';

import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';

import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { FullScreenComponent } from '../theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from '../theme/components/applications/applications.component';
import { MessagesComponent } from '../theme/components/messages/messages.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from '../theme/components/flags-menu/flags-menu.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';



/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ExcelService } from './Export/excel.service';
import { VerticalMenuAffComponent } from '../theme/components/menu/vertical-menu-aff/vertical-menu-aff.component';
import { VerticalMenuPartComponent } from '../theme/components/menu/vertical-menu-part/vertical-menu-part.component';
import { VerticalMenuVenteComponent } from '../theme/components/menu/vertical-menu-vente/vertical-menu-vente.component';
import { FormatNumberPipe } from './format-number.pipe';
// import { ClickDroitDirective } from './click-droit.directive';
import { SharedModule } from './shared/shared.module';
// import { SharedModule } from 'app/shared.module';


registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,

    ToastrModule.forRoot({
      timeOut: 2500,
    }),
    NgbModule,
    //  SharedModule,
    PipesModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,

    routing,
    HttpClientModule
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FlagsMenuComponent,
    VerticalMenuAffComponent,
    VerticalMenuPartComponent,
    VerticalMenuVenteComponent,
    //dFormatNumberPipe,d

    // ClickDroitDirective,
    // NoRightClickDirective

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: FormatNumberPipe,
      useClass: FormatNumberPipe
    },
    //   {
    //     provide: ClickDroitDirective,
    //     useClass: ClickDroitDirective
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppconfigService],
    //   useFactory: (appConfigService: AppconfigService) => {
    //     return () => {
    //       //Make sure to return a promise!
    //     return appConfigService.loadAppConfig();
    //     };
    //   }
    // },
    // { provide: MatDialog,
    //   useValue: {} },
    ExcelService

    //  { provide: NZ_I18N, useValue: en_US },

  ],
  // exports: [FormatNumberPipe]

})
export class PagesModule { }
