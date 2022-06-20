import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = [];

  settings = {
    actions: false,
    columns: {
      orderId: {
        title: "Order Id"
      },
      orderStatus: {
        title: "Order Status", type: 'html'
      },
      paymentDate: {
        title: "Payment Date", filter: false
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

  constructor(private _commonService: CommonService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetManageOrder();
  }

  GetManageOrder() {
    this._commonService.get(Global.BASE_API_PATH + 'PaymentMaster/GetReportManageOrder').subscribe(res => {
      if (res.isSuccess) {
        this.orders = res.data;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    });
  }

}
