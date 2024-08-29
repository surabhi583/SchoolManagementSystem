import { Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from '../../../Models/staff';
import { StaffService } from '../../../Services/staff.service';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { StaffReportService } from '../../../Services/Reports/staff-report.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})

export class StaffListComponent implements OnInit {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";

  staffList: Staff[] = [];
  errorMessage!: string;

  constructor(private staffService: StaffService, private staffReportService: StaffReportService) { }

  public columnDefs: ColDef[] = [
    {
      field: "staffId",
      headerName: "Staff ID",
      filter: false,
      width: 200,
    },
    {
      field: "staffName",
      headerName: "Staff Name",
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      cellRenderer: (params: any) => {
        if (params.data.imagePath) {
          return `<figure><img [src]="${params.data.imagePath}" width="100%" height="auto" /></figure>`;
        }
        else
          return '';
      }
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/staff-edit/${params.data.staffId}" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a class='btn btn-info' title="details" data-action-type="details" href="/staff-details/${params.data.staffId}" >
                <mat-icon data-action-type="details" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       details</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" href="/staff-delete/${params.data.staffId}" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>
       <a data-action-type="download" class="btn btn-info" ><mat-icon data-action-type="download" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       file_download</mat-icon></a>`
      }
    }
  ];

  public staffGridOptions: GridOptions =
    {
      rowData: this.staffList,
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
    this.loadStaffList();
  }

  loadStaffList(): void {
    this.staffService.getAllStaffs().subscribe({
      next: (staffs) => {
        this.staffList = staffs;
      },
      error: (error) => {
        console.error('Error fetching staff list:', error);
        this.errorMessage = 'An error occurred while fetching the staff list. Please try again later.';
      }
    });
  }

  LoadReport() {

    this.staffReportService.GetReport().subscribe({
      next: (data) => {
        const basedata = "data:application/pdf;base64," + data;
        this.downloadFileObject(basedata);
      },
      error: (error) => {
        console.log('Observable emitted an error: ' + JSON.stringify(error));
      }
    });
  }

  downloadFileObject(base64String: string) {
    const linkSource = base64String;
    const downloadLink = document.createElement("a");
    const fileName = "convertedPDFFile.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
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
        case 'download':
          this.LoadReport();
          break;
      }
    }
  }
}

