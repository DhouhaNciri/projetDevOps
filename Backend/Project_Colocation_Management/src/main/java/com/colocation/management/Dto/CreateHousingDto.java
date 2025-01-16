package com.colocation.management.Dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;






@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateHousingDto {
   

    
	private String address;
    private String description;
    private double price;
    private int availableRooms;
   
    
    
}
