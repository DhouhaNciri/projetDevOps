import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuhtenticated: boolean = false;
  selectedOption: string | null = null;
  adminConnect = localStorage.getItem('admin')
  ownerConnect = localStorage.getItem('owner')
  tenantConnect = localStorage.getItem('tenant')
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {
  }
  ngOnInit(): void {
    this.adminConnect = localStorage.getItem('admin')
    this.ownerConnect = localStorage.getItem('owner')
    this.tenantConnect = localStorage.getItem('tenant')
    console.log(this.adminConnect, this.tenantConnect, this.ownerConnect)
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      this.isAuhtenticated = true;
    }

  }

  navigateToLoginAdmin() {
    this.headerService.userIs("admin")
    this.selectedOption = "admin"
    this.router.navigate(['/login']);
  }
  navigateToLoginStudent() {
    this.selectedOption = "owner"
    this.headerService.userIs("owner")
    this.router.navigate(['/login']);
  }
  navigateToLoginCompany() {
    this.selectedOption = "tenant"
    this.headerService.userIs("tenant")
    this.router.navigate(['/login']);

  }
  goToLogin() {
    localStorage.clear()
    this.adminConnect = localStorage.getItem('admin')
    this.ownerConnect = localStorage.getItem('owner')
    this.tenantConnect = localStorage.getItem('tenant')
    this.router.navigate(['/home']);

  }
}
