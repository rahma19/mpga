import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenteRouting } from './vente.routing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { VenteComponent } from './vente/vente.component';
import { AddVenteComponent } from './vente/add-vente/add-vente.component';
import { UpdateVenteComponent } from './vente/update-vente/update-vente.component';
import { DetailVenteComponent } from './vente/detail-vente/detail-vente.component';
import { ChangerEtatComponent } from './vente/changer-etat/changer-etat.component';
import { TransactionTopupModule } from '../transaction-topup/transaction-topup.module';
import { UpdateAgentComponent } from './vente/update-vente/update-agent/update-agent.component';
import { ErrormsgComponent } from './vente/update-vente/errormsg/errormsg.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ClotureModule } from '../cloture/cloture.module';

import { ImpressionComponent } from './vente/impression/impression.component';
import { SharedModule } from '../shared/shared.module';
import { PrintComponent } from './print/print.component';
import { DropdownComponent } from './vente/update-vente/dropdown/dropdown.component';
import { UpdateCaisseComponent } from './vente/update-caisse/update-caisse.component';

import { UpdateServiceComponent } from './vente/update-service/update-service.component';

import { ActifServiceComponent } from './vente/actif-service/actif-service.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { AffiliationComponent } from './vente/affiliation/affiliation.component';
import { CaisseAffComponent } from './vente/affiliation/caisse-aff/caisse-aff.component';
import { DatailCanalComponent } from './vente/update-vente/datail-canal/datail-canal.component';
import { DetailCaisseComponent } from './vente/update-vente/detail-caisse/detail-caisse.component';











@NgModule({
  declarations: [VenteComponent, AddVenteComponent, UpdateVenteComponent, DetailVenteComponent,
     ChangerEtatComponent, UpdateAgentComponent, ErrormsgComponent,ImpressionComponent, 
     PrintComponent,DropdownComponent, UpdateCaisseComponent,UpdateServiceComponent, ActifServiceComponent, 
     AffiliationComponent, CaisseAffComponent, DatailCanalComponent, DetailCaisseComponent],
  entryComponents:[VenteComponent, AddVenteComponent, UpdateVenteComponent,DetailVenteComponent,
    ChangerEtatComponent,UpdateAgentComponent,ErrormsgComponent,ImpressionComponent,DropdownComponent,
    UpdateCaisseComponent,UpdateServiceComponent,ActifServiceComponent,AffiliationComponent, CaisseAffComponent
    , DatailCanalComponent, DetailCaisseComponent],
  providers: [
   // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

   ],
  imports: [
    CommonModule,
    VenteRouting,
    ClotureModule,
    TransactionTopupModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatRadioModule, 
    MatSliderModule,
    MatAutocompleteModule,
    MatTableModule,

    MatTreeModule,
     SharedModule,
     CdkStepperModule,
    DragDropModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    TranslateModule
  
 
   
  ]
 
})
export class VenteModule { }
