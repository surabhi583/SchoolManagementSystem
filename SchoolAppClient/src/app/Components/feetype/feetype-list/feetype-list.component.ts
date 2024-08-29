import { Component, OnInit } from '@angular/core';
import { FeeTypeService } from '../../../Services/feetype.service';
import { Router } from '@angular/router';
import { FeeType } from '../../../Models/feetype';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-feetype-list',
  templateUrl: './feetype-list.component.html',
  styleUrl: './feetype-list.component.css'
})
export class FeetypeListComponent implements OnInit {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";
  feeTypes: FeeType[] = [];
  searchfeeTypeId: number | undefined;
  confirmationDialogVisible: boolean = false;
  feeTypeIdToDelete: number | undefined;

  constructor(private feeTypeService: FeeTypeService) { }

  public columnDefs: ColDef[] = [
    {
      field: "feeTypeId",
      headerName: "ID",
      filter: false,
      width: 100,
    },
    {
      field: "typeName",
      headerName: "Name",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/fee-types/${params.data.feeTypeId}/edit" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>`
      }
    }
  ];

  public feeTypeGridOptions: GridOptions =
    {
      rowData: this.feeTypes,
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
    this.getFeeTypes();
  }

  getFeeTypes(): void {
    this.feeTypeService.getFeeTypes().subscribe(data => {
      this.feeTypes = data;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationDialogVisible = true;
    this.feeTypeIdToDelete = id;
  }

  deleteFeeType(): void {
    if (this.feeTypeIdToDelete !== undefined) {
      this.feeTypeService.deleteFeeType(this.feeTypeIdToDelete).subscribe(() => {

        this.feeTypes = this.feeTypes.filter(feeType => feeType.feeTypeId !== this.feeTypeIdToDelete);

        this.confirmationDialogVisible = false;
        this.feeTypeIdToDelete = undefined;
      });
    }
  }

  closeConfirmationDialog(): void {
    this.confirmationDialogVisible = false;
    this.feeTypeIdToDelete = undefined;
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
          this.confirmDelete(data.feeTypeId);
          break;
      }
    }
  }
}
