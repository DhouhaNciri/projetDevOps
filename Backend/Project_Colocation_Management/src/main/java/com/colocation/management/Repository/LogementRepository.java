package com.colocation.management.Repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.colocation.management.Model.Logement;
import com.colocation.management.Model.Role;
import com.colocation.management.Model.User;

import java.util.List;
import java.util.Optional;
@Repository

public interface LogementRepository extends JpaRepository<Logement, Long> {




 
}