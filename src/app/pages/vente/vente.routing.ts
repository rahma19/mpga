import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenteComponent } from './vente/vente.component';



const routes: Routes = [
  {
    path: 'magasin',
    component: VenteComponent,
    data: {
      breadcrumb: 'Liste magasin'
    }
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VenteRouting { }