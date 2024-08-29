import { Component, inject } from '@angular/core';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AppUser } from '../../SecurityModels/auth-response';
import { AuthService } from '../../SecurityModels/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private gridApi!: GridApi;
  public UserList: AppUser[] = [];
  public themeClass: string = "ag-theme-quartz";
  private service = inject(AuthService);

  public columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "Category ID",
      filter: false,
      width: 200,
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        if (params.data.role) {
          var domElem = '';
          params.data.role.forEach((r: any) => {
            domElem = domElem + '<span>' + r + '</span>'
          });
          return domElem;
        }
        else
          return '';
      }

    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        return `<a class='btn btn-warning' href="/assignrole/${params.data.id}">
                <mat-icon class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></a>`
      }
    }
  ];

  public userGridOptions: GridOptions =
    {
      rowData: this.UserList,
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

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.service.users().subscribe({
      next: (response: AppUser[]) => {
        this.UserList = response;
        this.userGridOptions.rowData = this.UserList;
      },
      error: (error) => {
        console.log('Observable emitted an error:' + error);
      }
    });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  onRowClicked(e: any) {
    if (e.event.target !== undefined) {
    }
  }
}
