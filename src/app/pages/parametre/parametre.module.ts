import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametreRouting } from './parametre.routing';
import { ParametreComponent } from './parametre/parametre.component';


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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailParametreComponent } from './parametre/detail-parametre/detail-parametre.component';
import { UpdateParametreComponent } from './parametre/update-parametre/update-parametre.component';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { DetailEtatComponent } from './parametre/detail-etat/detail-etat.component';
import { UpdateEtatComponent } from './parametre/update-etat/update-etat.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [ParametreComponent, DetailParametreComponent, UpdateParametreComponent, DetailEtatComponent, UpdateEtatComponent],
  entryComponents:[DetailParametreComponent, UpdateParametreComponent,DetailEtatComponent,UpdateEtatComponent],
  imports: [
    CommonModule,
    ParametreRouting,
   
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
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
    DragDropModule
  ]
})
export class ParametreModule { }
