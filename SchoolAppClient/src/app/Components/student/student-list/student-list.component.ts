import { Component, OnInit } from '@angular/core';
import { Student } from '../../../Models/student';
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { StudentService } from '../../../Services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class ListStudentComponent implements OnInit {

  public students: Student[] = [];
  public studentId!: number;
  private gridApi!: GridApi;
  public confirmationDialogVisible: boolean = false;
  public departmentIdToDelete: number | undefined;

  public paginationPageSize: number = 5;
  public paginationPageSizeSelector: number[] | boolean = [5, 20, 50];
  public themeClass: string = "ag-theme-quartz";
  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    resizable: true,
  };

  public columnDefs: ColDef[] = [
    {
      field: "studentId",
      headerName: "ID",
      width: 100,
      filter: false,
    },
    {
      field: "studentName",
      headerName: "Name",
      width: 150,
    },
    {
      field: "admissionNo",
      headerName: "Admission No",
      width: 150,
    },
    {
      field: "enrollmentNo",
      headerName: "Enrollment No",
      width: 150,
    },
    {
      field: "studentDOB",
      headerName: "Date of Birth",
      width: 150,
    },
    {
      field: "standard.standardName",
      headerName: "Standard",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-primary' href="/student/${params.data.studentId}/edit">Edit</a>
        <a class='btn btn-primary' href="/student-details/${params.data.studentId}">Details</a>
          <button data-action-type="delete" class="btn btn-danger" >Delete</button>`
      }
    }
  ];

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.studentService.GetStudents().subscribe({
      next: (staffs) => {
        this.students = staffs;
      },
      error: (error) => {
        console.log('Observable emitted an error: ' + error);
      }
    });
  }

  deleteStudent(student: Student): void {
    const confirmDelete: boolean = confirm(`Delete: ${student.studentName}?`);
    if (confirmDelete) {
      this.studentService.DeleteStudent(student.studentId).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.log('Observable emitted an error: ' + error);
        }
      });
    }
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
          return this.deleteStudent(data);
      }
    }
  }
}

