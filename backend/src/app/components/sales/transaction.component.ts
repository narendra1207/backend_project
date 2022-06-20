import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions = [];

  settings = {
    actions: false,
    columns: {
      transactionsId: {
        title : "Transactions Id"
      },
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
    this.GetTransactionDetails();
  }

  GetTransactionDetails() {
    this._commonService.get(Global.BASE_API_PATH + 'PaymentMaster/GetReportTransactionDetails').subscribe(res => {
      if (res.isSuccess) {
        this.transactions = res.data;
        debugger;
      } else {
        this._toastr.error(res.errors[0], "Dashboard");
      }
    });
  }

}

