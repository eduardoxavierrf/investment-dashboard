package me.xavier.investment_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.xavier.investment_dashboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}