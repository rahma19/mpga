import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaiementComponent } from './paiement/paiement.component';





const routes: Routes = [
  {
    path: 'service_paiement',
    component: PaiementComponent,
    data: {
      breadcrumb: 'Service Paiement'
    }
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PaiementRouting { }