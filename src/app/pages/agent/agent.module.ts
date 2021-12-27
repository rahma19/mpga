import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';
import { MvtAgentComponent } from './mvt-agent/mvt-agent.component';
import { ParamAgentComponent } from './param-agent/param-agent.component';
import { AgentRouting } from './agent.routing';
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

import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AddAgentComponent } from './liste-agent/add-agent/add-agent.component';
import { UpdateAgentComponent } from './liste-agent/update-agent/update-agent.component';
import { DetailAgentComponent } from './liste-agent/detail-agent/detail-agent.component';
import { MvtComponent } from './liste-agent/mvt/mvt.component';

import { AddMvtComponent } from './mvt-agent/add-mvt/add-mvt.component';
import { UpdateMvtComponent } from './mvt-agent/update-mvt/update-mvt.component';
import { DetailMvtComponent } from './mvt-agent/detail-mvt/detail-mvt.component';
import { AnnuleMvtComponent } from './mvt-agent/annule-mvt/annule-mvt.component';
import { TransactionTopupModule } from '../transaction-topup/transaction-topup.module';




@NgModule({
  declarations: [ListeAgentComponent, MvtAgentComponent, ParamAgentComponent, AddAgentComponent, UpdateAgentComponent, DetailAgentComponent, MvtComponent, AddMvtComponent, UpdateMvtComponent, DetailMvtComponent, AnnuleMvtComponent],
  entryComponents:[ AddAgentComponent, UpdateAgentComponent, DetailAgentComponent,UpdateMvtComponent, DetailMvtComponent, AnnuleMvtComponent],
  imports: [
    CommonModule,
    AgentRouting,
    FormsModule,
    TransactionTopupModule,
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
    // 
    MatTreeModule,
     SharedModule
  ]
})
export class AgentModule { }
