import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReconciliationComponent } from './reconciliation/reconciliation.component';
import { EcartComponent } from './ecart/ecart.component';


const routes: Routes = [
    {
      path: 'reconciliation',
      component: ReconciliationComponent,
      data: {
        breadcrumb: 'Réconciliation'
      }
    },
    {
        path: 'ecart',
        component: EcartComponent,
        data: {
          breadcrumb: 'Ecart'
        }
      }
      
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClotureRouting { }