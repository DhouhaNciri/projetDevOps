import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: any=FormGroup;
constructor(private authService:AuthService,
  private fb:FormBuilder){

}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[null,Validators.required],
   
      
    });
  }

  forgetPassword(){
    console.log("inside forgot password");
    
    let formData = this.loginForm.value;
    var data={
      email: formData.email,
          }
          this.loginForm.reset();
    this.authService.forgetPassword(data).subscribe(
      (response)=>{
Swal.fire("Check your Email to get your password")
      },(error)=>{
        Swal.fire("Email Not found in our platform")
      }
    )


  }
}
