import { Component, OnInit } from '@angular/core';
import { MonthlyPayment } from '../../../Models/monthly-payment';
import { MonthlyPaymentService } from '../../../Services/monthly-payment.service';
import { DatePipe } from '@angular/common'
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-monthlypayment-list',
  templateUrl: './monthlypayment-list.component.html',
  styleUrl: './monthlypayment-list.component.css'
})
export class MonthlypaymentListComponent implements OnInit {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";

  monthlyPayments: MonthlyPayment[] = [];
  confirmationDialogVisible: boolean = false;
  monthlyPaymentIdToDelete: number | undefined;

  searchPaymentId: string = '';

  constructor(private monthlyPaymentService: MonthlyPaymentService, private readonly datePipe: DatePipe) { }

  public columnDefs: ColDef[] = [
    {
      field: "monthlyPaymentId",
      headerName: "Payment ID",
      filter: false,
      width: 150,
    },
    {
      field: "student.studentName",
      headerName: "Student Name",
      width: 150,
    },
    {
      field: "student.enrollmentNo",
      headerName: "Enrollment No",
      width: 150,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
    },
    {
      field: "amountPaid",
      headerName: "Amount Paid",
      width: 150,
    },
    {
      field: "amountRemaining",
      headerName: "Amount Remaining",
      width: 150,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 150,
      valueFormatter: (params: any) => {
        if (!params.data || !params.data.paymentDate) {
          return '';
        }
        let paymentDate = this.datePipe.transform(params.data.paymentDate, 'MMM/dd/yyyy');
        return paymentDate || '';
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/monthlypayment/${params.data.monthlyPaymentId}" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a class='btn btn-info' title="details" data-action-type="details" href="/monthlypayment/${params.data.monthlyPaymentId}" >
                <mat-icon data-action-type="details" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       details</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>`
      }
    }
  ];

  public mPaymentGridOptions: GridOptions =
    {
      rowData: this.monthlyPayments,
      pagination: true,
      paginationPageSizeSelector: [5, 10, 20, 50, 100],
      paginationPageSize: 5,
      defaultColDef: {
        sortable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        floatingFilter: true,
      },
      columnDefs: this.columnDefs
    };


  ngOnInit(): void {
    this.loadMonthlyPayments();
  }

  loadMonthlyPayments(): void {
    this.monthlyPaymentService.getAllMonthlyPayments().subscribe(monthlyPayments => {
      this.monthlyPayments = monthlyPayments;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationDialogVisible = true;
    this.monthlyPaymentIdToDelete = id;
  }

  deleteMonthlyPayment(): void {
    if (this.monthlyPaymentIdToDelete !== undefined) {
      this.monthlyPaymentService.deleteMonthlyPayment(this.monthlyPaymentIdToDelete).subscribe(() => {
        this.monthlyPayments = this.monthlyPayments.filter(payment => payment.monthlyPaymentId !== this.monthlyPaymentIdToDelete);
        this.closeConfirmationDialog();
      });
    }
  }

  closeConfirmationDialog(): void {
    this.confirmationDialogVisible = false;
    this.monthlyPaymentIdToDelete = undefined;
  }

  customPaymentIdFilter(args: any): void {
    const filterValue = this.searchPaymentId.toLowerCase();
    args.dataSource = this.monthlyPayments.filter(mp => mp.monthlyPaymentId.toString().toLowerCase().includes(filterValue));
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  onRowClicked(e: any) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute('data-action-type');
      switch (actionType) {
        case 'delete':
          this.confirmDelete(data.monthlyPaymentId);
          break;
      }
    }
  }
}
