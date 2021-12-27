import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalierComponent } from './journalier/journalier.component';
import { MensuelComponent } from './mensuel/mensuel.component';
import { TableaubordRouting } from './tableaubord.routing';



@NgModule({
  declarations: [JournalierComponent, MensuelComponent],
  imports: [
    CommonModule,
    TableaubordRouting
  ]
})
export class TableaubordModule { }
