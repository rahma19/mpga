import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconciliationComponent } from './reconciliation/reconciliation.component';
import { EcartComponent } from './ecart/ecart.component';
import { ClotureRouting } from './cloture.routing';

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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from "@angular/material/paginator";


import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionTopupModule } from '../transaction-topup/transaction-topup.module';
import { DetailReconciliationComponent } from './reconciliation/detail-reconciliation/detail-reconciliation.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from '../shared/shared.module';
import { ClotureManuelComponent } from './reconciliation/cloture-manuel/cloture-manuel.component';

import { DetailEcartComponent } from './reconciliation/detail-ecart/detail-ecart.component';
import { DetailMagasinComponent } from './reconciliation/detail-magasin/detail-magasin.component';
import { ValiderReconComponent } from './reconciliation/valider-recon/valider-recon.component';
import { ViewecartComponent } from './ecart/viewecart/viewecart.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [ReconciliationComponent, EcartComponent, DetailReconciliationComponent, ClotureManuelComponent, DetailEcartComponent, DetailMagasinComponent, ValiderReconComponent, ViewecartComponent],
  entryComponents: [DetailReconciliationComponent, ClotureManuelComponent, DetailEcartComponent, DetailMagasinComponent, ValiderReconComponent, ViewecartComponent],
  providers: [
    // {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

  ],
  imports: [
    CommonModule, MatMenuModule,
    ClotureRouting, MatPaginatorModule,
    TransactionTopupModule,
    MatTableModule, MatSortModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,

    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSliderModule,
    MatIconModule,
    MatAutocompleteModule,
    SharedModule,
    CdkStepperModule,
    DragDropModule
  ]
})
export class ClotureModule { }
