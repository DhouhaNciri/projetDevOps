package com.colocation.management.Service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.colocation.management.Model.Housing;
import com.colocation.management.Repository.HousingRepository;
@Service
public class HousingService {
	 private final HousingRepository housingRepository;

	    
	    public HousingService(HousingRepository housingRepository) {
	        this.housingRepository = housingRepository;
	    }

	    public List<Housing> searchHousing(String address, double maxPrice, boolean availability) {
	        return housingRepository.findByPriceLessThanEqual(maxPrice).stream()
	                .filter(h -> h.isAvailability() == availability && h.getAddress().contains(address))
	                .collect(Collectors.toList());
	    }

	    public Housing createHousing(Housing housing) {
	        return housingRepository.save(housing);
	    }
	    public Housing getHousingById(Long id) {
	        return housingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Housing not found with id: " + id));
	    }
	    public void deleteHousing(Long id) {
	        housingRepository.deleteById(id);
	    }
	    public Long countHousing() {
	       return housingRepository.count();
	    }
	    
	    
	    
	    
	   
	    public Housing updateHousing(Long id, Housing housingDetails) {
	        Housing housing = housingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Housing not found with id: " + id));

	        housing.setAddress(housingDetails.getAddress());
	       // housing.setCreatedBy(housingDetails.getCreatedBy());
	        housing.setDescription(housingDetails.getDescription());
	        housing.setPrice(housingDetails.getPrice());
	        housing.setAvailability(housingDetails.isAvailability());
	       // housing.setPhotos(housingDetails.getPhotos());
	        housing.setAvailableRooms(housingDetails.getAvailableRooms());
	        housing.setAmenities(housingDetails.getAmenities());
	        housing.setCharacteristics(housingDetails.getCharacteristics());
	        return housingRepository.save(housing);
	    }
	    
	    
	    
}
