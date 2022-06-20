import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../sales/orders.component';
import { TransactionComponent } from '../sales/transaction.component';

const routes: Routes = [
  {path:'', children:[
    {path: 'orders', component:OrdersComponent},
    {path: 'transactions', component:TransactionComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
