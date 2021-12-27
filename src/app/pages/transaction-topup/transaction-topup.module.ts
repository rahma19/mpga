import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
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
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionTopupRoutingModule } from './transaction-topup-routing.module';
// import {DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TransactionTestComponent } from './transaction-test/transaction-test.component';
import { FormatNumberPipe } from '../format-number.pipe';
import { TestPipe } from '../shared/test.pipe';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../shared/shared.module';
import { LanguagePipe } from '../shared/language.pipe';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { DetailTransactionComponent } from './detail-transaction/detail-transaction.component';

@NgModule({
  declarations: [TransactionComponent, TransactionTestComponent, MessageComponent, DetailTransactionComponent],
  entryComponents: [TransactionComponent, MessageComponent, DetailTransactionComponent],
  providers: [DecimalPipe, //  {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    TestPipe, LanguagePipe, FormatNumberPipe
  ],
  imports: [
    CommonModule, TransactionTopupRoutingModule,// AgGridModule.withComponents([]),
    MatTableModule, FormsModule, ReactiveFormsModule, MatDialogModule,
    MatSelectModule, MDBBootstrapModule, MatExpansionModule, FormsModule,
    ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatMenuModule,
    MatInputModule, MatRippleModule, MatSelectModule, MatDialogModule,
    MatSlideToggleModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule,
    MDBBootstrapModule.forRoot(), MatRadioModule, MatPaginatorModule,
    MatAutocompleteModule,// DatePipe,        
    SharedModule, MatSliderModule, MatSortModule,
    CdkStepperModule, DragDropModule,
    MatIconModule // BrowserAnimationsModule,BrowserModule
  ]
})

export class TransactionTopupModule { }
