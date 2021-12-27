import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {ProfileRouting} from './profile.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';




import {MatToolbarModule} from '@angular/material/toolbar';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  entryComponents:[ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRouting,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatRadioModule, 
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
     
  ]
})
export class ProfileModule { }
