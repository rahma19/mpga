import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametreComponent } from './parametre/parametre.component';



const routes: Routes = [
  {
    path: 'parametre',
    component: ParametreComponent,
    data: {
      breadcrumb: 'Paramètres'
    }
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ParametreRouting { }