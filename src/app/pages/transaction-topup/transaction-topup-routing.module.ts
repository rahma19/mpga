import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionTestComponent } from './transaction-test/transaction-test.component';


const routes: Routes = [
  {
    path: 'transaction',
    component: TransactionComponent,
    data: {
      breadcrumb: 'Liste transaction'
    }
  },
  {
    path: 'consultertransaction',
    component: TransactionTestComponent,
    data: {
      breadcrumb: 'Consulter transaction'
    }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionTopupRoutingModule { }
