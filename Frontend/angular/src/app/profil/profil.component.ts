import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

class User {
   email:any
   firstName:any
   lastName:any
   phoneNumber:any
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  ownerConnect = localStorage.getItem('owner')
  tenantConnect = localStorage.getItem('tenant')
  user:any = new User()
  constructor(protected adminService : AdminService){

  }
  ngOnInit(): void {
    this.getProfil()
  }

  getProfil(){
    if(this.ownerConnect){
      
      this.ownerConnect = this.ownerConnect.slice(1 , this.ownerConnect.length-1)
      console.log(this.ownerConnect)
      this.adminService.getUserByEmail(localStorage.getItem('email')).subscribe(res=>{
        console.log(res);
        this.user = res
        
      })
    }else if (this.tenantConnect){
      this.tenantConnect = this.tenantConnect.slice(1 , this.tenantConnect.length-1)
      console.log(this.tenantConnect)
      this.adminService.getUserByEmail(localStorage.getItem('email')).subscribe(res=>{
        console.log(res);
        this.user = res
        
      })
    }
  }

  save(){
    if(this.ownerConnect){
      
     
      this.adminService.updateUser(this.user , this.user.id).subscribe(res=>{
        Swal.fire({
          title: "Update",
          text: "Profil updated successfuly",
          icon: "success"
        }).then(()=>{
          window.location.reload()

        })
        
      })
    }else if (this.tenantConnect){
      delete this.user.firstName
      delete this.user.lastName
      this.adminService.updateUser(this.user , this.user.id).subscribe(res=>{
        Swal.fire({
          title: "Update",
          text: "Profil updated successfuly",
          icon: "success"
        }).then(()=>{
          window.location.reload()

        })
        
      })
    }
  }

}
