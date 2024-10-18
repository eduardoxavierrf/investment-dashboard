package me.xavier.investment_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.xavier.investment_dashboard.model.Stock;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
  List<Stock> findBySymbolContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(String symbol, String companyName);
}