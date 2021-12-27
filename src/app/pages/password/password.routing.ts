import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordComponent} from './password/password.component';


const routes: Routes = [
    {
        path:'password',
        component:PasswordComponent,
        data: {
            breadcrumb: 'password'
          }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PasswordRouting { }