import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';

import * as ChartConfig from '../../shared/charts/chartData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // count = {
  //   //  countTo: 100, 

  //    from: 0,
  //    duration: 1 ,
  //   Orders : 100,
  //   ShippingAmpount : 500,
  //   CashOnDelivery : 300,
  //   Cancelled : 200,
  //   };
  // count = {
  //   //  countTo: 100, 

  //    from: 0,
  //    duration: 1 ,
  //   Orders : 0,
  //   ShippingAmount : 0,
  //   CashOnDelivery : 0,
  //   Cancelled : 0,
  //   };
  count = {
     from: 0,
     duration: 1 ,
   
    };
    
    objCountData = [
     { bgColorClass : 'bg-warning card-body',
     fontColorClass : 'font-warning',
     icon : 'navigation',
     title : 'Orders',
     count : 0
    },
     { bgColorClass : 'bg-secondary card-body',
     fontColorClass : 'font-secondary',
     icon : 'box',
     title : 'Shipping Amount',
     count : 0
    },
     { bgColorClass : 'bg-primary card-body',
     fontColorClass : 'font-primary',
     icon : 'message-square',
     title : 'Cash On Delivery',
     count : 0
    },
     { bgColorClass : 'bg-danger card-body',
     fontColorClass : 'font-danger',
     icon : 'navigation',
     title : 'Cancelled',
     count : 0
    },
    ];
    orders = [];

    settings = {
      actions: false,
      hideSubHeader: true,
      columns: {
        orderId: {
          title: "Order Id"
        },
        orderStatus: {
          title: "Order Status", type: 'html'
        },
        paymentDate: {
          title: "Payment Date"
        },
        paymentMethod: {
          title: "Payment Method"
        },
        paymentStatus: {
          title: "Payment Status", type: 'html'
        },
        shippingAmount: {
          title: "Shipping Amount"
        },
        subTotalAmount: {
          title: "Sub Total Amount"
        },
        totalAmount: {
          title: "Total Amount"
        }
      }
    };
    lineChartOptions: any ;  
    lineChartLegend :boolean
     lineChartType : string;
         lineChartData = []; 
           lineChartLabels = []; 
              

  constructor(private _commonService:CommonService ,private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetReportNetFigure();
    this.GetLatestOrder();
    this.getChartData();
  }

  GetReportNetFigure(){

    this._commonService.get(Global.BASE_API_PATH+ 'PaymentMaster/GetReportNetFigure').subscribe(res=>{
      if(res.isSuccess){
        // debugger;
        // this.count.Orders= res.data[0].orders;
        // this.count.ShippingAmount= res.data[0].shippingAmount;
        // this.count.CashOnDelivery= res.data[0].cashOnDelivery;
        // this.count.Cancelled= res.data[0].cancelled;
      

        this.objCountData[0].count= res.data[0].orders;
        this.objCountData[1].count= res.data[0].shippingAmount;
        this.objCountData[2].count= res.data[0].cashOnDelivery;
        this.objCountData[3].count= res.data[0].cancelled;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    })
  }
  GetLatestOrder(){
    this._commonService.get(Global.BASE_API_PATH+ 'PaymentMaster/GetReportManageOrder').subscribe(res=>{
      if(res.isSuccess){
        this.orders= res.data;
      // debugger;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    })
  }

  getChartData(){
   this.lineChartOptions =ChartConfig.lineChartOptions , 
    this.lineChartLegend = ChartConfig.lineChartLegend,
    //  this.lineChartType =ChartConfig.lineChartType,
  this.lineChartData = [ 
      { data: [1, 1, 2, 1, 2, 2], label : 'Series A' },
       { data: [0, 1, 1, 2, 1, 1], label : 'Series B'  }, 
       { data: [0, 1, 0, 1, 2, 1] , label : 'Series C' },
        { data: [1, 2, 3, 2, 1, 3] , label : 'Series D' } ]; 
      this.lineChartLabels = ["1 min.", "10 min.", "20 min.", "30 min.", "40 min.", "50 min."]; 
        
  }
}
