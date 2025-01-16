package com.colocation.management.Model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Housing implements Serializable  {

    private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private String description;
    private double price;
    private boolean availability;

    @ElementCollection
    private List<String> photos;

    private int availableRooms;
    @ElementCollection
    @CollectionTable(name = "housing_amenities", joinColumns = @JoinColumn(name = "housing_id"))
    @Column(name = "amenity")
    private List<String> amenities;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) 

    private User createdBy;
    
    private String characteristics;

}
