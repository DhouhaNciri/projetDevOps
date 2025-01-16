package com.colocation.management.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.colocation.management.Model.Housing;
import com.colocation.management.Model.User;
import com.colocation.management.Service.HousingService;
@RequestMapping("/api/housing")
@RestController
public class HousingController {
	 private final HousingService housingService;

	
	    public HousingController(HousingService housingService) {
	        this.housingService = housingService;
	    }

	    @GetMapping
	    public List<Housing> getAllAvailableHousing() {
	        return housingService.searchHousing("", Double.MAX_VALUE, true);
	    }
	    
	    @GetMapping("/count")
	    public Long getAllHoussing() {
	        return housingService.countHousing();
	    }

	    @PostMapping
	    public ResponseEntity<Housing> createHousing(@RequestBody Housing housing) {
	    	 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	         if (authentication == null || !authentication.isAuthenticated()) {
	             throw new RuntimeException("Authentication failed or user not authenticated");
	         }
	         
	        User us= (User) authentication.getPrincipal();
	        housing.setCreatedBy(us);
	        Housing savedHousing = housingService.createHousing(housing);
	        return ResponseEntity.status(HttpStatus.CREATED).body(savedHousing);
	    }

	    @GetMapping("/search")
	    public List<Housing> searchHousing(@RequestParam String address, @RequestParam double maxPrice) {
	        return housingService.searchHousing(address, maxPrice, true);
	    }
	    
	    @DeleteMapping("/delete/{id}")
	    public void deleteHousing(@PathVariable Long id) {
	        housingService.deleteHousing(id);
	    }
	    
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Housing> updateHousing(@PathVariable Long id, @RequestBody Housing housingDetails) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication == null || !authentication.isAuthenticated()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	        }
	        
	      
	        User authenticatedUser = (User) authentication.getPrincipal();
	        Housing existingHousing = housingService.getHousingById(id);

	        if (existingHousing.getCreatedBy().getId().equals(authenticatedUser.getId())) {
	         
	            Housing updatedHousing = housingService.updateHousing(id, housingDetails);
	            return ResponseEntity.ok(updatedHousing);
	        } else {
	           
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
	        }
	    }
}