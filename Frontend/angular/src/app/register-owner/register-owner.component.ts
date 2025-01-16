import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.scss']
})
export class RegisterOwnerComponent implements OnInit {
  signupForm: any = FormGroup;
  public showPassword: boolean = false;
  constructor( private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private snackbar:SnackbarService,
    ) {

   }
  ngOnInit(): void {
    this.signupForm=this.fb.group({
      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      email:[null,[Validators.required]],
      phoneNumber:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(7)]]
      
         });
  
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  handleSubmit(){
  
    console.log(this.signupForm.value);
    let formData = this.signupForm.value;
    var data={
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber:formData.phoneNumber,
      role:"OWNER",
      password:formData.password,
     

    }
    console.log(data);
    this.authService.signupStudent(data).subscribe(
      (response)=>{
console.log(response);

  Swal.fire(' Sign-Up successfully');


// this.snackbar.openSnackBar(response, 'success');

this.signupForm.reset();

      },(error)=>{
console.log(error);
Swal.fire('Please Check your details');

      }
    )
  }
}
