import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NgChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
// import { ChartistModule } from 'ng-chartist'
@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgChartsModule,
    Ng2SmartTableModule,
    Ng2GoogleChartsModule
    
  ]
})
export class ReportsModule { }
