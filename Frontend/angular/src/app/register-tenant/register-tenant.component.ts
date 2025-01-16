import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-tenant',
  templateUrl: './register-tenant.component.html',
  styleUrls: ['./register-tenant.component.scss']
})
export class RegisterTenantComponent implements OnInit {
  signupForm!: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(7)]],
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const data = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password,
      role: "TENANT",
    };

    this.authService.signup(data).subscribe({
      next: (response) => {
        Swal.fire('Tenant added successfully', '', 'success');
        this.signupForm.reset();
      },
      error: (err) => {
        Swal.fire('Please check your details', '', 'error');
      },
    });
  }
}

