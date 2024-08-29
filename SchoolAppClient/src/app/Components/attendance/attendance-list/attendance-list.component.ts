import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../../Models/attendance';
import { AttendanceService } from '../../../Services/attendance.service';
import { Router } from '@angular/router';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { StaffReportService } from '../../../Services/Reports/staff-report.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.css'
})
export class AttendanceListComponent implements OnInit {
  attendances: Attendance[] = [];
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";

  constructor(private attendanceService: AttendanceService, private router: Router, private staffReportService: StaffReportService) { }

  public columnDefs: ColDef[] = [
    {
      field: "date",
      headerName: "Date",
      filter: false,
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "attendanceIdentificationNumber",
      headerName: "Attendance Identification Number",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "isPresent",
      headerName: "Is Present?",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/attendance-edit/${params.data.attendanceId}" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a class='btn btn-info' title="details" data-action-type="details" href="/attendance-details/${params.data.attendanceId}" >
                <mat-icon data-action-type="details" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       details</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" href="/attendance-delete/${params.data.attendanceId}" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>
       <a data-action-type="download" class="btn btn-info" ><mat-icon data-action-type="download" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       file_download</mat-icon></a>`
      }
    }
  ];

  public attendanceGridOptions: GridOptions =
    {
      rowData: this.attendances,
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
    this.getAttendances();
  }

  getAttendances(): void {
    this.attendanceService.getAttendances().subscribe({
      next: (attendances) => {
        this.attendances = attendances;
      },
      error: (error) => {
        console.error('Error fetching attendances:', error);

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
