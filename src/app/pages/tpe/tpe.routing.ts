import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TpeComponent } from './tpe/tpe.component';



const routes: Routes = [
  {
    path: 'tpe',
    component: TpeComponent,
    data: {
      breadcrumb: 'TPE'
    }
  }
 

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TpeRouting { }
