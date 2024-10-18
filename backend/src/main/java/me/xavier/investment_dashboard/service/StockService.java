package me.xavier.investment_dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.xavier.investment_dashboard.model.Stock;
import me.xavier.investment_dashboard.repository.StockRepository;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    public List<Stock> findBySymbolContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(String symbol, String companyName) {
        return stockRepository.findBySymbolContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(symbol, companyName);
    }
}
