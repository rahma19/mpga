import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { authGuardGuard } from './pages/login/auth-guard.guard';
import { PagesComponent } from './pages/pages.component';
import { TransactionTopupModule } from './pages/transaction-topup/transaction-topup.module';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
   { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule',canActivate: [authGuardGuard] },
 // { path: 'transaction-topup', loadChildren: 'app/pages/transaction-topup/transaction-topup.module#TransactionTopupModule' },
  //{ path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  // { path: '**', component: NotFoundComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  // { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [authGuardGuard] },
  // { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  // { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: '**', component: NotFoundComponent },





];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
   // useHash: true
});