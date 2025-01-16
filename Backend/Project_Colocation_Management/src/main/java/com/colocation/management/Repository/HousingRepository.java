package com.colocation.management.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colocation.management.Model.Housing;

@Repository
public interface HousingRepository extends JpaRepository<Housing, Long> {
	List<Housing> findByAvailability(boolean availability);
    List<Housing> findByPriceLessThanEqual(double maxPrice);
    List<Housing> findByCreatedBy_Id(Long userId);

	
}
