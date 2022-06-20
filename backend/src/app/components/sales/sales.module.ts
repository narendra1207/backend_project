import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders.component';
import { TransactionComponent } from './transaction.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    OrdersComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    Ng2SmartTableModule

  ]
})
export class SalesModule { }
