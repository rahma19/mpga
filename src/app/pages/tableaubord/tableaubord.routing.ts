import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalierComponent } from './journalier/journalier.component';
import { MensuelComponent } from './mensuel/mensuel.component';


const routes: Routes = [
    {
      path: 'journalier',
      component: JournalierComponent,
      data: {
        breadcrumb: 'Journalier'
      }
    },
    {
        path: 'mensuel',
        component: MensuelComponent,
        data: {
          breadcrumb: 'Mensuel'
        }
      }
      
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TableaubordRouting { }