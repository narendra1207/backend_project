import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';
import * as ChartConfig from '../../shared/charts/chartData';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  lineChartOptions: any;
  lineChartLegend: boolean;
  lineChartType: string;
  lineChartData = [];
  lineChartLabels = [];

  chart: any;
  columnChart: any;
  lineChart: any;
  invoice = [];
  settings = {
    actions: false,
    // hideSubHeader: true, // hame yha sub header chahiye isliye comment kiya
    columns: {
      invoiceNo: {
        title: 'Invoice No',
      },
      orderStatus: {
        title: 'Order Status',
        type: 'html',
      },
      paymentDate: {
        title: 'Payment Date',
        filter: false,
        // filter attribute use kiya or isko false kiya to ab yha pr search bala option nahi ayega;
      },
      paymentMethod: {
        title: 'Payment Method',
      },
      paymentStatus: {
        title: 'Payment Status',
        type: 'html',
      },
      shippingAmount: {
        title: 'Shipping Amount',
      },
      subTotalAmount: {
        title: 'Sub Total Amount',
      },
      totalAmount: {
        title: 'Total Amount',
      },
    },
  };

  constructor(
    private _commonService: CommonService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.SalesDataPaymentTypeWise();
    this.GetInvoiceList();
    this.GetOrderStatusChartData_ColumnChart();
    this. GetOrderStatusChartData_LineChart()
    // this.GetCustomerGrowth();
  }

  SalesDataPaymentTypeWise() {
    (this.lineChartOptions = ChartConfig.lineChartOptions),
      (this.lineChartLegend = ChartConfig.lineChartLegend),
      (this.lineChartType = ChartConfig.lineChartType),
      (this.lineChartData = [
        { data: [1, 1, 2, 1, 2, 2], label: 'Series A' },
        { data: [0, 1, 1, 2, 1, 1], label: 'Series B' },
        { data: [0, 1, 0, 1, 2, 1], label: 'Series C' },
        { data: [1, 2, 3, 2, 1, 3], label: 'Series D' },
      ]);
    this.lineChartLabels = [
      '1 min.',
      '10 min.',
      '20 min.',
      '30 min.',
      '40 min.',
      '50 min.',
    ];
  }
  GetInvoiceList() {
    this._commonService
      .get(Global.BASE_API_PATH + 'PaymentMaster/GetReportInvoiceList')
      .subscribe((res) => {
        if (res.isSuccess) {
          this.invoice = res.data;
          // debugger;
        } else {
          this._toastr.error(res.errors[0], 'Dashboard');
        }
      });
  }

  GetOrderStatusChartData_ColumnChart() {
    //google-chart - ColumnChart
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Year', 'Sales', 'Expenses'],
        ['100', 2.5, 3.8],
        ['200', 3, 1.8],
        ['300', 3, 4.3],
        ['400', 0.9, 2.3],
        ['500', 1.3, 3.6],
        ['600', 1.8, 2.8],
        ['700', 3.8, 2.8],
        ['800', 1.5, 2.8],
      ],
      options: {
        legend: { position: 'none' },
        bars: 'vertical',
        vAxis: { format: 'decimal' },
        height: 340,
        width: '100%',
        colors: ['#ff7f83', '#a5a5a5'],
        backgroundColor: 'transparent',
      },
    };
  }

  GetOrderStatusChartData_LineChart() {
    this.lineChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Year', 'Sales', 'Expenses'],
        ['100', 2.5, 3.8],
        ['200', 3, 1.8],
        ['300', 3, 4.3],
        ['400', 0.9, 2.3],
        ['500', 1.3, 3.6],
        ['600', 1.8, 2.8],
        ['700', 3.8, 2.8],
        ['800', 1.5, 2.8],
      ],
      options: {
        legend: { position: 'none' },
        bars: 'vertical',
        vAxis: { format: 'decimal' },
        height: 340,
        width: '100%',
        colors: ['#ff7f83', '#a5a5a5'],
        backgroundColor: 'transparent',
      },
    };
  }
  // GetCustomerGrowth() {
  //  this.chart = {
  //     type: 'Line',
  //     data: { labels: [], series: [[3, 4, 3, 5, 4, 3, 5]] },
  //     options: {
  //       showScale: false,
  //       fullWidth: !0,
  //       showArea: !0,
  //       label: false,
  //       width: '600',
  //       height: '358',
  //       low: 0,
  //       offset: 0,
  //       axisX: { showLabel: false, showGrid: false },
  //       axisY: { showLabel: false, showGrid: false, low: 0, offset: -10 },
  //     },
  //   };
  // }
}
