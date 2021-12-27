import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';




const routes: Routes = [
  {
    path: 'configuration',
    component: ConfigurationComponent,
    data: {
      breadcrumb: 'Configuration'
    }
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConfigurationRouting { }