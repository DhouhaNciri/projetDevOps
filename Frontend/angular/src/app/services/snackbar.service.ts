import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    console.log("inside the opens snackbar");
    
    let panelClass = ''; // Initialize panel class as empty
  
    if (action == 'error') {
      panelClass = 'error-snackbar'; 
    } else {
      panelClass = 'success-snackbar'; 
    }
  
    this.snackbar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500,
      panelClass: [action === 'error' ? 'error-snackbar' : 'success-snackbar'],
    });
  }
}
