import { Component } from '@angular/core';
import { MarksEntry } from '../../../Models/marks-entry';
import { MarkEntryService } from '../../../Services/marks-entry.service';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-marksnew-entry-list',
  templateUrl: './marksnew-entry-list.component.html',
  styleUrl: './marksnew-entry-list.component.css'
})
export class MarksnewEntryListComponent {
  private gridApi!: GridApi;
  public themeClass: string = "ag-theme-quartz";
  markEntries: MarksEntry[] = [];

  constructor(private markEntryService: MarkEntryService) { }

  public columnDefs: ColDef[] = [
    {
      field: "markEntryId",
      headerName: "Mark Entry Id",
      filter: false,
      width: 100,
    },
    {
      field: "markEntryDate",
      headerName: "Mark Entry Date",
      width: 150,
    },
    {
      field: "staff.staffName",
      headerName: "Staff Name",
      width: 150,
    },
    {
      field: "examSchedule.examScheduleName",
      headerName: "Exam Schedule Name",
      width: 150,
    },
    {
      field: "examType.examTypeName",
      headerName: "Exam Type",
      width: 150,
    },
    {
      field: "subject.subjectName",
      headerName: "Subject Name",
      width: 150,
    },
    {
      field: "standard.standardName",
      headerName: "Standard Name",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' data-action-type="edit" href="/markNew-entry-edit/${params.data.markEntryId}" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>
       <a class='btn btn-info' title="details" data-action-type="details" href="/markNew-entry-details/${params.data.markEntryId}" >
                <mat-icon data-action-type="details" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       details</mat-icon></a>
       <a data-action-type="delete" class="btn btn-danger" href="/markNew-entry-delete/${params.data.markEntryId}" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></a>`
      }
    }
  ];

  public markEntryGridOptions: GridOptions =
    {
      rowData: this.markEntries,
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
    this.loadMarkEntries();
  }

  loadMarkEntries() {
    this.markEntryService.getAllMarkEntries().subscribe(markEntries => {
      this.markEntries = markEntries;
    });
  }

  getStudentsDetails(markEntry: MarksEntry) {
    markEntry.studentMarksDetails = [];
    this.markEntryService.GetStudents(markEntry).subscribe(students => {
      markEntry.studentMarksDetails = students;
    });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  onRowClicked(e: any) {
  }
}
