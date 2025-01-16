import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {

  dataSource:any;
  displayedColumns: string[] = ["firstName","lastName","email", "phoneNumber","Actions"];

constructor(private adminService:AdminService,
  private router:Router
  ){

}

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  ngOnInit(): void {
this.getAllStudent()
  }
  getAllStudent() {
this.adminService.getAllOwner().subscribe(
  (data:any) => {
    console.log(data);
    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  },
  (err:any) => {

   
console.log(err);

  });

  }

  handleDeleteAction(values: any){
    console.log(values.id);
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes", implement company deletion here
        console.log('Deleting company...');
        this.deleteStudent(values.id);
      } else {
        // User clicked "Cancel" or closed the dialog
        console.log('Deletion canceled.');
      }
    });
  }
        
      
      
  deleteStudent(id: any) {
          this.adminService.deleteUser(id).subscribe(
      (reponse:any)=>{
        
    Swal.fire("Student deleted successfully")
      this.getAllStudent();
     
      

        
      },
      (error:any)=>{
        Swal.fire("Error deleting Please try again")
        console.log(error);
        

        
      console.log(error);
    
      
      }
      
          );
        }

        handleUpdateStudent(id:number){
          console.log(id);
          
          this.router.navigate(['/dashboard/updateStudent/',id])
        }
}
