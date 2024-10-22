package me.xavier.investment_dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.xavier.investment_dashboard.model.HistoricalData;
import me.xavier.investment_dashboard.service.HistoricalDataService;

import java.util.List;
import java.time.LocalDate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/historical_data")
public class HistoricalDataController {
    @Autowired
    private HistoricalDataService historicalDataService;

    @GetMapping("/find")
    public ResponseEntity<List<HistoricalData>> getByName(
      @RequestParam String symbol,
      @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<HistoricalData> stocks = historicalDataService.findByStock_SymbolAndDateBetween(symbol, startDate, endDate);
        
        if (stocks.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(stocks);
        }
    }
}
