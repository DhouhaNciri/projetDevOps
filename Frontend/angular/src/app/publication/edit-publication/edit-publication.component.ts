import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Housing } from 'src/app/add-housing/housing.model';
import { HousingService } from 'src/app/add-housing/housing.service';



import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss'],
})
export class EditPublicationComponent implements OnInit {
  housing: Housing;

  constructor(
    private housingService: HousingService,
    @Inject(MAT_DIALOG_DATA) public data: Housing // Use the interface here
  ) {
    this.housing = { ...data }; // Create a copy to avoid directly mutating the input data
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.housing.id) {
      this.housingService.updateHousing(this.housing.id, this.housing).subscribe(
        () => {
          Swal.fire('Updated', 'Housing updated successfully!', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Failed to update housing.', 'error');
          console.error(error);
        }
      );
    } else {
      Swal.fire('Error', 'Housing ID is missing.', 'error');
    }
  }
}