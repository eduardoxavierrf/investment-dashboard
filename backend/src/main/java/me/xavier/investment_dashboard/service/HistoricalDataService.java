package me.xavier.investment_dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.xavier.investment_dashboard.repository.HistoricalDataRepository;
import me.xavier.investment_dashboard.model.HistoricalData;

import java.util.List;
import java.time.LocalDate;

@Service
public class HistoricalDataService {
    @Autowired
    private HistoricalDataRepository historicalDataRepository;

    public List<HistoricalData> findByStock_SymbolAndDateBetween(String symbol, LocalDate startDate, LocalDate endDate) {
        return historicalDataRepository.findByStock_SymbolAndDateBetween(symbol, startDate, endDate);
    }
}
