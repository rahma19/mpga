import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaiementComponent } from './paiement/paiement.component';
import { PaiementRouting } from './paiement.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEtablissementComponent } from './paiement/add-etablissement/add-etablissement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AddBinComponent } from './paiement/add-bin/add-bin.component';

import { ModifierBinComponent } from './paiement/modifier-bin/modifier-bin.component';
import { SupprimerBinComponent } from './paiement/supprimer-bin/supprimer-bin.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UpdateEtablissementComponent } from './paiement/update-etablissement/update-etablissement.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AjouterCanalComponent } from './paiement/ajouter-canal/ajouter-canal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetailBinComponent } from './paiement/detail-bin/detail-bin.component';
import { EmetteurComponent } from './paiement/emetteur/emetteur.component';
import { DetailEmetteurComponent } from './paiement/emetteur/detail-emetteur/detail-emetteur.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { AffNokComponent } from './paiement/aff-nok/aff-nok.component';



@NgModule({
  declarations: [PaiementComponent, AddEtablissementComponent, AddBinComponent, ModifierBinComponent, SupprimerBinComponent,
    UpdateEtablissementComponent, AjouterCanalComponent, DetailBinComponent, EmetteurComponent, DetailEmetteurComponent, AffNokComponent],
  entryComponents: [PaiementComponent, AddEtablissementComponent, AddBinComponent, ModifierBinComponent,
    SupprimerBinComponent, AffNokComponent, UpdateEtablissementComponent, AjouterCanalComponent, DetailBinComponent, EmetteurComponent, DetailEmetteurComponent],
  imports: [
    CommonModule,
    PaiementRouting,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    CdkStepperModule,
    DragDropModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    TranslateModule,
    CdkStepperModule,
    DragDropModule,
    MatTableModule
  ]
})
export class PaiementModule { }
