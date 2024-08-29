import { Component, inject } from '@angular/core';
import { GridOptions, ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AuthService } from '../../SecurityModels/auth.service';
import { AppRole } from '../../SecurityModels/auth-response';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  private gridApi!: GridApi;
  public roles: AppRole[] = [];
  public themeClass: string = "ag-theme-quartz";
  model: AppRole = new AppRole();
  errorMessage!: string | null;
  state: string = 'list';

  private service = inject(AuthService);
  public columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      filter: false,
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      filter: false,
      cellRenderer: (params: any) => {
        return `<button class='btn btn-warning' data-action-type="edit" >
                <mat-icon data-action-type="edit" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       edit</mat-icon></button>
       <button data-action-type="delete" class="btn btn-danger" ><mat-icon data-action-type="delete" class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">
       delete</mat-icon></button>`
      }
    }
  ];

  public roleGridOptions: GridOptions =
    {
      rowData: this.roles,
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

  editRole(edit: AppRole) {
    this.model = edit;
    this.state = 'entry';
  }
  createNew() {
    this.state = 'entry';
    this.model = new AppRole();
  }
  cancel() {
    this.state = 'list';
    this.model = new AppRole();
  }
  deleteRole(id: string) {

    this.service.roleDelete(id).subscribe({
      next: (response: any) => {
        console.log('Ok:' + JSON.stringify(response));
        this.LoadData();
      },
      error: (response: any) => {
        alert(response.error);
        this.errorMessage = response.error;
        console.log('Observable emitted an error:' + JSON.stringify(response));
      }
    });
  }
  clearMessage() {
    this.errorMessage = null;
  }
  submitData(event: Event) {
    event.preventDefault();

    this.service.roleEntry(this.model).subscribe({
      next: (response: any) => {
        this.LoadData();
      },
      error: (error) => {
        console.log('Observable emitted an error:' + JSON.stringify(error));
      }
    });
  }
  LoadData() {
    this.state = 'list';
    this.service.roles().subscribe({
      next: (response: AppRole[]) => {
        this.roles = response;
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
      let data = e.data;
      let actionType = e.event.target.getAttribute('data-action-type');
      switch (actionType) {
        case 'edit':
          this.editRole(data);
          break;
        case 'delete':
          this.deleteRole(data.id);
          break;
      }
    }
  }
}
