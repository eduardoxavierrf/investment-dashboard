package me.xavier.investment_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.xavier.investment_dashboard.model.Stock;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
  List<Stock> findBySymbolContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(String symbol, String companyName);
  Optional<Stock> findBySymbol(String symbol);
}