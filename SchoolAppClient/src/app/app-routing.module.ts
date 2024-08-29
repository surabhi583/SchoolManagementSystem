import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarksListComponent } from './Components/marks/marks-list/marks-list.component';
import { MarksAddComponent } from './Components/marks/marks-add/marks-add.component';
import { MarksEditComponent } from './Components/marks/marks-edit/marks-edit.component';
import { MarksDeleteComponent } from './Components/marks/marks-delete/marks-delete.component';
import { AttendanceListComponent } from './Components/attendance/attendance-list/attendance-list.component';
import { AttendanceAddComponent } from './Components/attendance/attendance-add/attendance-add.component';
import { FeetypeListComponent } from './Components/feetype/feetype-list/feetype-list.component';
import { FeetypeEditComponent } from './Components/feetype/feetype-edit/feetype-edit.component';
import { FeetypeCreateComponent } from './Components/feetype/feetype-create/feetype-create.component';
import { FeeListComponent } from './Components/fee/fee-list/fee-list.component';
import { FeeCreateComponent } from './Components/fee/fee-create/fee-create.component';
import { FeeEditComponent } from './Components/fee/fee-edit/fee-edit.component';
import { MonthlypaymentListComponent } from './Components/monthlypayment/monthlypayment-list/monthlypayment-list.component';
import { MonthlypaymentEditComponent } from './Components/monthlypayment/monthlypayment-edit/monthlypayment-edit.component';
import { MonthlypaymentCreatComponent } from './Components/monthlypayment/monthlypayment-create/monthlypayment-create.component';
import { MonthlypaymentDetailsComponent } from './Components/monthlypayment/monthlypayment-details/monthlypayment-details.component';
import { StaffListComponent } from './Components/staff/staff-list/staff-list.component';
import { StaffSalaryListComponent } from './Components/staff-salary/staff-salary-list/staff-salary-list.component';
import { LoginComponent } from './Authentication/SecurityComponents/login/login.component';
import { AuthGuard } from './Authentication/SecurityModels/auth.guard';
import { StaffCreateComponent } from './Components/staff/staff-create/staff-create.component';
import { ExamtypeListComponent } from './Components/examtype/examtype-list/examtype-list.component';
import { ExamtypeAddComponent } from './Components/examtype/examtype-add/examtype-add.component';
import { ExamtypeEditComponent } from './Components/examtype/examtype-edit/examtype-edit.component';
import { StaffEditComponent } from './Components/staff/staff-edit/staff-edit.component';
import { StaffDetailsComponent } from './Components/staff/staff-details/staff-details.component';
import { StaffDeleteComponent } from './Components/staff/staff-delete/staff-delete.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { OtherpaymentListComponent } from './Components/other-payment/other-payment-list/other-payment-list.component';
import { OtherpaymentCreatComponent } from './Components/other-payment/other-payment-create/other-payment-create.component';
import { OtherpaymentEditComponent } from './Components/other-payment/other-payment-edit/other-payment-edit.component';
import { OtherpaymentDetailsComponent } from './Components/other-payment/other-payment-details/other-payment-details.component';
import { DepartmentCreateComponent } from './Components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './Components/department/department-edit/department-edit.component';
import { StandardListComponent } from './Components/standard/standard-list/standard-list.component';
import { StandardCreateComponent } from './Components/standard/standard-create/standard-create.component';
import { StandardEditComponent } from './Components/standard/standard-edit/standard-edit.component';
import { PaymentDetailsPerStudentComponent } from './Components/payment-details/payment-details-per-student/payment-details-per-student.component';
import { StaffSalaryCreateComponent } from './Components/staff-salary/staff-salary-create/staff-salary-create.component';
import { StaffSalaryEditComponent } from './Components/staff-salary/staff-salary-edit/staff-salary-edit.component';
import { MarksnewEntryListComponent } from './Components/marks-new/marksnew-entry-list/marksnew-entry-list.component';
import { MarkEntryCreateComponent } from './Components/marks-new/marksnew-entry-create/marksnew-entry-create.component';
import { MarkEntryDetailsComponent } from './Components/marks-new/marksnew-entry-details/marksnew-entry-details.component';
import { MarksnewEntryDeleteComponent } from './Components/marks-new/marksnew-entry-delete/marksnew-entry-delete.component';
import { DashboardComponent } from './Components/dashboard/dashboard-grid/dashboard-grid.component';
import { ExamscheduleListComponent } from './Components/examschedule/examschedule-list/examschedule-list.component';
import { ExamscheduleAddComponent } from './Components/examschedule/examschedule-add/examschedule-add.component';
import { ExamscheduleEditComponent } from './Components/examschedule/examschedule-edit/examschedule-edit.component';
import { ExamScheduleStandardsListComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-list/exam-schedule-standards-list.component';
import { ExamScheduleStandardsCreateComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-create/exam-schedule-standards-create.component';
import { ExamScheduleStandardsEditComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-edit/exam-schedule-standards-edit.component';
import { ListStudentComponent } from './Components/student/student-list/student-list.component';
import { StudentAddComponent } from './Components/student/student-add/student-add.component';
import { StudentEditComponent } from './Components/student/student-edit/student-edit.component';
import { StudentDetailsComponent } from './Components/student/student-details/student-details.component';
import { SubjectListComponent } from './Components/subject/subject-list/subject-list.component';
import { SubjectAddComponent } from './Components/subject/subject-add/subject-add.component';
import { SubjectEditComponent } from './Components/subject/subject-edit/subject-edit.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { AssignRoleComponent } from './Authentication/SecurityComponents/assign-role/assign-role.component';
import { RolesComponent } from './Authentication/SecurityComponents/roles/roles.component';
import { UsersComponent } from './Authentication/SecurityComponents/users/users.component';
import { RegistrationComponent } from './Authentication/SecurityComponents/registration/registration.component';
import { AboutComponent } from './Components/about/about.component';
import { UserProfileComponent } from './Authentication/SecurityComponents/profile/user.profile.component';

const routes: Routes = [

  { path: "", redirectTo: "/home", pathMatch: "full" },


  { path: "register", component: RegistrationComponent, },
  { path: "login", component: LoginComponent, },
  { path: "about", component: AboutComponent, },
  { path: "userlist", component: UsersComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] } },
  { path: "role-index", component: RolesComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] } },
  { path: "assignrole/:id", component: AssignRoleComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] } },

  { path: "marksentrynewList", component: MarksnewEntryListComponent, canActivate: [AuthGuard] },
  { path: 'markNew-entry-create', component: MarkEntryCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'markNew-entry-details/:id', component: MarkEntryDetailsComponent, canActivate: [AuthGuard] },
  { path: 'markNew-entry-delete/:id', component: MarksnewEntryDeleteComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard]  },

  { path: "marksList", component: MarksListComponent, canActivate: [AuthGuard] },
  { path: 'marks/add', component: MarksAddComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'marks/edit/:id', component: MarksEditComponent, data: { roles: ['Admin', 'Operator'], canActivate: [AuthGuard] } },
  { path: "marks/delete/:id", component: MarksDeleteComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: "attendanceList", component: AttendanceListComponent, canActivate: [AuthGuard] },
  { path: "attendance/add", component: AttendanceAddComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: 'departments', component: DepartmentListComponent, canActivate: [AuthGuard] },
  { path: 'departments/create', component: DepartmentCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'departments/:id/edit', component: DepartmentEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: 'fee-types', component: FeetypeListComponent, canActivate: [AuthGuard] },
  { path: 'fee-types/create', component: FeetypeCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'fee-types/:id/edit', component: FeetypeEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: 'fees', component: FeeListComponent , canActivate: [AuthGuard]},
  { path: 'fees/create', component: FeeCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'fees/:id/edit', component: FeeEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },


  { path: 'monthlypayment', component: MonthlypaymentListComponent, canActivate: [AuthGuard] },
  { path: 'monthlypayment/create', component: MonthlypaymentCreatComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'monthlypayment/:id/edit', component: MonthlypaymentEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'monthlypayment/:id/details', component: MonthlypaymentDetailsComponent },

  { path: 'otherpayment', component: OtherpaymentListComponent, canActivate: [AuthGuard] },
  { path: 'otherpayment/create', component: OtherpaymentCreatComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'otherpayment/:id/edit', component: OtherpaymentEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'otherpayment/:id/details', component: OtherpaymentDetailsComponent },

  { path: 'staff-list', component: StaffListComponent, canActivate: [AuthGuard] },
  { path: 'staff-create', component: StaffCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'staff-edit/:id', component: StaffEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'staff-details/:id', component: StaffDetailsComponent },
  { path: 'staff-delete/:id', component: StaffDeleteComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: 'staff-salaries', component: StaffSalaryListComponent, canActivate: [AuthGuard] },
  { path: 'staff-salaries-create', component: StaffSalaryCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'staff-salaries-edit/:id', component: StaffSalaryEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  
  { path: 'exam-types', component: ExamtypeListComponent, canActivate: [AuthGuard] },
  { path: 'examType/create', component: ExamtypeAddComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: "examType/edit/:id", component: ExamtypeEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },


  { path: 'examSchedule', component: ExamscheduleListComponent, canActivate: [AuthGuard] },
  { path: 'examSchedule/create', component: ExamscheduleAddComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: "examSchedule/edit/:id", component: ExamscheduleEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: "examScheduleStandard", component: ExamScheduleStandardsListComponent, canActivate: [AuthGuard] },
  { path: "examScheduleStandard/create", component: ExamScheduleStandardsCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: "examScheduleStandard/edit/:id", component: ExamScheduleStandardsEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  
  { path: 'standards', component: StandardListComponent, canActivate: [AuthGuard] },
  { path: 'standard/create', component: StandardCreateComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'standard/:id/edit', component: StandardEditComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },

  { path: 'pmaymentdetails', component: PaymentDetailsPerStudentComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] } },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'students', component: ListStudentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'student/create', component: StudentAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] }  },
  { path: 'student/:id/edit', component: StudentEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] }  },
  { path: 'student-details/:id', component: StudentDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Operator'] }  },

  { path: 'subjects', component: SubjectListComponent, canActivate: [AuthGuard] },
  { path: 'subject/add', component: SubjectAddComponent, data: { roles: ['Admin', 'Operator'] }, canActivate: [AuthGuard] },
  { path: 'subject/:id/edit', component: SubjectEditComponent },

  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
