import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../../../Models/department';
import { ColDef, GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { DepartmentServices } from '../../../Services/department.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
})
export class DepartmentListComponent implements OnInit {
  private gridApi!: GridApi;
  public departments: Department[] = [];
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
      field: "departmentId",
      headerName: "Dept ID",
      width: 100,
    },
    {
      field: "departmentName",
      headerName: "Name",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-primary' href="/departments/${params.data.departmentId}/edit">Edit</a>
          <button data-action-type="delete" class="btn btn-danger" >Delete</button>`
      }
    }
  ];

  constructor(private departmentService: DepartmentServices, private router: Router) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.departments = data;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationDialogVisible = true;
    this.departmentIdToDelete = id;
  }

  deleteDepartment(): void {
    if (this.departmentIdToDelete !== undefined) {
      this.departmentService.deleteDepartment(this.departmentIdToDelete).subscribe(() => {
        this.departments = this.departments.filter(department => department.departmentId !== this.departmentIdToDelete);
        this.closeConfirmationDialog();
      });
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  closeConfirmationDialog(): void {
    this.confirmationDialogVisible = false;
    this.departmentIdToDelete = undefined;
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
          return this.confirmDelete(data.departmentId);
      }
    }
  }
}
