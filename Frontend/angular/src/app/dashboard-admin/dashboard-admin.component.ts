import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  housingCount: string = '';

  constructor(private router: Router, private housingService: HousingService) {}

  ngOnInit(): void {
    this.getHousingCount();
    console.log(this.housingCount)
  }

  // Fetch the housing count from the service
  getHousingCount(): void {
    this.housingService.countHousing().subscribe(
      (count) => {
        this.housingCount = count;
      },
      (error) => {
        console.error('Failed to fetch housing count:', error);
      }
    );
  }

  // Logout method
  logout(): void {
    // Clear user-related data from localStorage
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
