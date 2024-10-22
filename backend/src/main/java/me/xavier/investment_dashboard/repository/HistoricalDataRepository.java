package me.xavier.investment_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.xavier.investment_dashboard.model.HistoricalData;

import java.util.List;
import java.time.LocalDate;

public interface HistoricalDataRepository extends JpaRepository<HistoricalData, Long> {
    List<HistoricalData> findByStock_SymbolAndDateBetween(String symbol, LocalDate startDate, LocalDate endDate);
}
