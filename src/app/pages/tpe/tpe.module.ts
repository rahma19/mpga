import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TpeComponent } from './tpe/tpe.component';
import { TpeRouting } from './tpe.routing';
import { AddTpeComponent } from './tpe/add-tpe/add-tpe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TransactionTopupModule } from '../transaction-topup/transaction-topup.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChangeEtatComponent } from './tpe/change-etat/change-etat.component';
import { DetailComponent } from './tpe/detail/detail.component';
import { UpdateTpeComponent } from './tpe/update-tpe/update-tpe.component';

import { DetailsFileComponent } from './tpe/details-file/details-file.component';
import { MatRadioModule } from '@angular/material/radio';

import {CdkStepperModule} from '@angular/cdk/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [TpeComponent, AddTpeComponent, ChangeEtatComponent, DetailComponent, UpdateTpeComponent, DetailsFileComponent],
  entryComponents:[TpeComponent, AddTpeComponent, ChangeEtatComponent, DetailComponent, UpdateTpeComponent, DetailsFileComponent],
  imports: [
    CommonModule,
    TpeRouting,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,

    TransactionTopupModule,
    MatAutocompleteModule,
    MatRadioModule,
    CdkStepperModule,
    DragDropModule
  ]
})
export class TpeModule { }
