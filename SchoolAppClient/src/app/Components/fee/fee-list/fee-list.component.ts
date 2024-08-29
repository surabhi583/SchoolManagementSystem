import { Component, OnInit } from '@angular/core';
import { Fee } from '../../../Models/fee';
import { FeeService } from '../../../Services/fee-service.service';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrl: './fee-list.component.css'
})
export class FeeListComponent implements OnInit {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";
  public fees: Fee[] = [];
  confirmationDialogVisible: boolean = false;
  feeIdToDelete: number | undefined;

  constructor(private feeService: FeeService) { }

  public columnDefs: ColDef[] = [
    {
      field: "feeId",
      headerName: "Fee ID",
      filter: false,
      width: 100,
    },
    {
      field: "feeType.typeName",
      headerName: "Fee Type",
      width: 150,
    },
    {
      field: "standard.standardName",
      headerName: "Standard",
      width: 150,
    },
    {
      field: "paymentFrequency",
      headerName: "Payment Frequency",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/fees/${params.data.feeId}/edit" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>`
      }
    }
  ];

  public feeGridOptions: GridOptions =
    {
      rowData: this.fees,
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
    this.loadFees();
  }

  loadFees() {
    this.feeService.getAllFees().subscribe(fees => {
      this.fees = fees;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationDialogVisible = true;
    this.feeIdToDelete = id;
  }

  deleteFee(): void {
    if (this.feeIdToDelete !== undefined) {
      this.feeService.deleteFee(this.feeIdToDelete).subscribe(() => {
        this.fees = this.fees.filter(fee => fee.feeId !== this.feeIdToDelete);
        this.closeConfirmationDialog();
      });
    }
  }

  closeConfirmationDialog(): void {
    this.confirmationDialogVisible = false;
    this.feeIdToDelete = undefined;
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
          this.confirmDelete(data.feeId);
          break;
      }
    }
  }
}
