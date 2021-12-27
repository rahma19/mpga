import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationRouting } from './configuration.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetailCommentaireComponent } from './configuration/detail-commentaire/detail-commentaire.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ConfigurationComponent, DetailCommentaireComponent],
  entryComponents:[ConfigurationComponent,DetailCommentaireComponent],
  imports: [
    CommonModule,
    ConfigurationRouting,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    MatSelectModule
  ]
})
export class ConfigurationModule { }
