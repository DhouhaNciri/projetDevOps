import { Component } from '@angular/core';
import { HousingService } from './housing.service';
import { Housing } from './housing.model';

@Component({
  selector: 'app-add-housing',
  templateUrl: './add-housing.component.html',
  styleUrls: ['./add-housing.component.scss']
})
export class AddHousingComponent {
  housing: Housing = {
    address: '',
    description: '',
    price: 0,
    availability: true,
    photos: [],
    availableRooms: 0,
    amenities: [],
    characteristics:''
  };

  // Temporary strings to capture comma-separated input
  photosString: string = '';
  amenitiesString: string = '';

  
  constructor(private housingService: HousingService) {}

  onSubmit() {
    // Convert photosString and amenitiesString to arrays
    if (this.photosString) {
      this.housing.photos = this.photosString.split(',').map(photo => photo.trim());
    }
    if (this.amenitiesString) {
      this.housing.amenities = this.amenitiesString.split(',').map(amenity => amenity.trim());
    }

    // Call the service to submit the housing data
    this.housingService.createHousing(this.housing).subscribe(
      (response) => {
        console.log('Housing added successfully:', response);
      },
      (error) => {
        console.error('Error adding housing:', error);
      }
    );
  }
}
