package com.colocation.management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.colocation.management.Model.Role;
import com.colocation.management.Model.User;

import java.util.List;
import java.util.Optional;
@Repository

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);
 boolean existsByEmail(String email);
 List<User> findByRole(Role role);

 
}