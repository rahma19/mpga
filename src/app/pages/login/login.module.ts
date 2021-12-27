import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './login.service';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MyHttpInterceptor } from './http-interceptor';
import { authGuardGuard } from './auth-guard.guard';
import { UserService } from '../services/User.service';


 


export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     
    RouterModule.forChild(routes),
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 900,
     }), 

  ],
  declarations: [LoginComponent],
  providers:[LoginService,UserService]
})

export class LoginModule { }

// {
//   provide : HTTP_INTERCEPTORS,
//   useClass : MyHttpInterceptor,
//   multi : true
// },