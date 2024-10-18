package me.xavier.investment_dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.xavier.investment_dashboard.model.Stock;
import me.xavier.investment_dashboard.service.StockService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public List<Stock> getAllUsers() {
        return stockService.findAll();
    }

    @GetMapping("/find")
    public ResponseEntity<List<Stock>> getByName(@RequestParam String query) {
        List<Stock> stocks = stockService.findBySymbolContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(query, query);
        
        if (stocks.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(stocks);
        }
    }
}
