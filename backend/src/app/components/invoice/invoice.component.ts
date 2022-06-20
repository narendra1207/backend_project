import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoice = [];
  settings = {
    actions: false,
    // hideSubHeader: true, // hame yha sub header chahiye isliye comment kiya
    columns: {
      invoiceNo: {
        title: "Invoice No"
      },
      orderStatus: {
        title: "Order Status", type: 'html'
      },
      paymentDate: {
        title: "Payment Date" , filter: false, 
        // filter attribute use kiya or isko false kiya to ab yha pr search bala option nahi ayega;
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

  constructor(private _commonService:CommonService ,private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.GetInvoiceList();
  }

  GetInvoiceList(){
    this._commonService.get(Global.BASE_API_PATH+ 'PaymentMaster/GetReportInvoiceList').subscribe(res=>{
      if(res.isSuccess){
        this.invoice= res.data;
      // debugger;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    })
  }
}
