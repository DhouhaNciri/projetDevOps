import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: any = FormGroup;
  userIs: any
  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private headerservice: HeaderService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.userIs = this.headerservice.checkUser;
    console.log(this.userIs)
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],

    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  handleSubmit() {
    this.userIs = this.headerservice.checkUser;
    console.log(this.userIs);
  
    let formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    };
  
    switch (this.userIs) {
      case 'admin':
        this.authservice.loginAdmin(data).subscribe(
          (response) => {
            const token = response?.token;
            if (token && response?.role === "ADMIN") {
              localStorage.setItem('token', token);
              localStorage.setItem('email', data.email);
            }
            if (response?.role === "ADMIN") {
              console.log(response);
              localStorage.removeItem('tenant');
              localStorage.removeItem('owner');
              localStorage.setItem('admin', JSON.stringify(response));
              this.router.navigate(['/dashboard']);
            } else {
              Swal.fire("please check your credentials");
            }
          },
          (error) => {
            console.log(error);
            Swal.fire("please check your credentials");
          }
        );
        return;
  
      case 'owner':
        this.authservice.loginStudent(data).subscribe(
          (response) => {
            const token = response?.token;
            if (token && response?.role === "OWNER") {
              localStorage.setItem('token', token);
              localStorage.setItem('email', data.email);
            }
            if (response?.role === "OWNER") {
              console.log("owner= ", response);
              Swal.fire("Connexion successful for the owner").then(() => {
                localStorage.removeItem('admin');
                localStorage.removeItem('tenant');
                localStorage.setItem('owner', JSON.stringify(response));
                this.router.navigate(['/']);
              });
            } else {
              Swal.fire("please check your credentials");
            }
          },
          (error) => {
            Swal.fire("please check your credentials");
          }
        );
        return;
  
      case 'tenant':
        this.authservice.loginCompany(data).subscribe(
          (response) => {
            const token = response?.token;
            if (token && response?.role === "TENANT") {
              localStorage.setItem('token', token);
              localStorage.setItem('email', data.email);
            }
            if (response?.role === "TENANT") {
              console.log(response);
              localStorage.setItem('tenant', JSON.stringify(response));
              localStorage.removeItem('admin');
              localStorage.removeItem('owner');
              this.router.navigate(['/']);
              Swal.fire("Connexion successful for the tenant");
            } else {
              Swal.fire("please check your credentials");
            }
          },
          (error) => {
            console.log(error);
            Swal.fire("please check your credentials");
          }
        );
        return;
  
      default:
        Swal.fire('Please Check your Role in the header before you Sign in');
        console.error('Role not recognized:');
    }
    console.log(data);
  }
  
}
