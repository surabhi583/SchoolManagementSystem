import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../SecurityModels/auth.service';
import { AuthRequest } from '../../SecurityModels/auth-request';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model!: AuthRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(private toastr: ToastrService) {
    this.model = new AuthRequest();
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  login(event: Event) {
    event.preventDefault();

    console.log(`Login: ${this.model.email} / ${this.model.password}`);

    this.authService
      .login(this.model)
      .subscribe({
        next : () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        window.location.href = returnUrl;
        },
        error: (error) => {
          this.toastr.error(error.error, "Login failed.");
        }
      });
  }
}
