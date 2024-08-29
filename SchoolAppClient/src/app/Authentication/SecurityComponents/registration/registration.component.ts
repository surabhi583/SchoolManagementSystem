import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../../SecurityModels/auth.service';
import { Router } from '@angular/router';
import { AuthRegRequest } from '../../SecurityModels/AuthRegRequest';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  model = new AuthRegRequest();
  registerForm: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailregex)]),
    'password': new FormControl(null, [Validators.required, this.checkPassword]),
    'roles': new FormControl('', [Validators.required])
  });
  fieldRequired: string = "This field is required";
  rolesList: string[] = [];
  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.rolesList = ["Admin", "Manager" ,"Operator" ,"Demo" ,"Student", "Guest"];
  }

  emailErrors(): string {
      return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
        this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string) {
    const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || 
                       this.registerForm.get(input)?.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    if (this.registerForm.invalid) {
      this.toastr.error("Invalid registration details.", "Registration")
      return;
    }
    this.model.email = formData.value.email;
    this.model.password = formData.value.password;
    this.model.userName = formData.value.username;
    this.model.role = formData.value.roles;

    this.authService.register(this.model).subscribe({
      next: ()=>{
        alert('Registration successful!');
        formDirective.resetForm();
        this.registerForm.reset();
        // Optionally, navigate to another page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error)=>{
        this.toastr.error(error.error, "Registration Error.");
        console.log(error);
      }
    });

  }
}
