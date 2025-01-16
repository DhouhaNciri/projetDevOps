import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  checkUser:any;


  userIs(user:String){
    this.checkUser=user;
    console.log(user);
    
  }

}
