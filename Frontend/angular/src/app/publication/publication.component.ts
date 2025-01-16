// Updated component.ts file
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HousingService } from '../services/housing.service'; 
import Swal from 'sweetalert2';
import { AddHousingComponent } from '../add-housing/add-housing.component';
import { DetailsComponent } from './details/details.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  

  tenantConnect = localStorage.getItem('tenant');
  ownerConnect = localStorage.getItem('owner');
  adminConnect = localStorage.getItem('admin');
  email = localStorage.getItem('email');
  housings: any[] = [];
  filteredHousings: any[] = [];

  // Filter variables
  searchQuery: string = '';
  filterPrice: number | null = null;
  filterAvailableRooms: number | null = null;
  filterAddress: string = '';
  filterCharacteristics: string = ''; // New filter variable
  housingCount: string = '';
  constructor(

    
    public dialog: MatDialog,
    private HousingService: HousingService,private router: Router

  ) {}

  ngOnInit(): void {
    this.getAllHousing();
    this.getHousingCount();
  }
  
  getHousingCount() {
    this.HousingService.countHousing().subscribe(count => {
      this.housingCount = count;
    }, error => {
      console.error('Failed to fetch housing count:', error);
    });
  }
  

  getAllHousing() {
    this.HousingService.getAllHousing().subscribe(res => {
      console.log(res);
      this.housings = res;
      this.filteredHousings = res;
    });
   
  }
 

  // Apply filters
  applyFilters() {
    this.filteredHousings = this.housings.filter(housing => {
      const matchesPrice = this.filterPrice ? housing.price <= this.filterPrice : true;
      const matchesRooms = this.filterAvailableRooms ? housing.availableRooms >= this.filterAvailableRooms : true;
      const matchesAddress = this.filterAddress ? housing.address.toLowerCase().includes(this.filterAddress.toLowerCase()) : true;
      const matchesSearch = housing.description.toLowerCase().includes(this.searchQuery.toLowerCase()) || housing.address.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCharacteristics = this.filterCharacteristics ? 
        housing.characteristics.toLowerCase().includes(this.filterCharacteristics.toLowerCase()) : true;

      return matchesPrice && matchesRooms && matchesAddress && matchesSearch && matchesCharacteristics;
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddHousingComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getAllHousing();
    });
  }

  show(data: any) {
    const dialogRef = this.dialog.open(DetailsComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllHousing();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditPublicationComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllHousing();
    });
  }

  delete(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.HousingService.deleteHousing(id).subscribe(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your housing listing has been deleted.",
            icon: "success"
          }).then(() => {
            this.getAllHousing();
          });
        });
      }
    });
  }

  openMessaging(housing: any): void {
    // Navigate to the chat page, passing the housing information or the necessary parameters as needed
    this.router.navigate(['/chat'], { queryParams: { userId: housing.createdBy.id } });
  }
}
