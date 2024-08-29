import { Component, OnInit } from '@angular/core';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { OthersPayment } from '../../../Models/other-payment';
import { OtherPaymentService } from '../../../Services/other-payment.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-other-payment-list',
  templateUrl: './other-payment-list.component.html',
  styleUrl: './other-payment-list.component.css'
})
export class OtherpaymentListComponent implements OnInit {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";

  otherPayments: OthersPayment[] = [];
  confirmationDialogVisible: boolean = false;
  otherPaymentIdToDelete: number | undefined;
  searchName: string = '';

  constructor(private otherPaymentService: OtherPaymentService, private datePipe: DatePipe) { }

  public columnDefs: ColDef[] = [
    {
      field: "othersPaymentId",
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
        return `<a class='btn btn-warning' data-action-type="edit" href="/otherpayment/${params.data.othersPaymentId}/edit" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a class='btn btn-info' title="details" data-action-type="details" href="/otherpayment/${params.data.othersPaymentId}/details" >
                <mat-icon data-action-type="details" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       details</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>`
      }
    }
  ];

  public oPaymentGridOptions: GridOptions =
    {
      rowData: this.otherPayments,
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
    this.loadOtherPayments();
  }

  loadOtherPayments(): void {
    this.otherPaymentService.getOtherPayments().subscribe(otherPayments => {
      this.otherPayments = otherPayments;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationDialogVisible = true;
    this.otherPaymentIdToDelete = id;
  }

  deleteOtherPayment(): void {
    if (this.otherPaymentIdToDelete !== undefined) {
      this.otherPaymentService.deleteOthersPayment(this.otherPaymentIdToDelete).subscribe(() => {
        this.otherPayments = this.otherPayments.filter(payment => payment.othersPaymentId !== this.otherPaymentIdToDelete);
        this.closeConfirmationDialog();
      });
    }
  }

  closeConfirmationDialog(): void {
    this.confirmationDialogVisible = false;
    this.otherPaymentIdToDelete = undefined;
  }

  customNameFilter(args: any): void {
    const filterValue = this.searchName.toLowerCase();
    args.dataSource = this.otherPayments.filter(payment => payment.student.studentName.toLowerCase().includes(filterValue));
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
          this.confirmDelete(data.othersPaymentId);
          break;
      }
    }
  }

}
