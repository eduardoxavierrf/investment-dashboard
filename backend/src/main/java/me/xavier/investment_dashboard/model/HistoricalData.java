package me.xavier.investment_dashboard.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "historical_data")
public class HistoricalData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "data_id", nullable = false)
    private Long dataId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_id", nullable = false)
    @JsonIgnore
    private Stock stock;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "open_price", precision = 10, scale = 2)
    private BigDecimal openPrice;

    @Column(name = "close_price", precision = 10, scale = 2)
    private BigDecimal closePrice;

    @Column(name = "high_price", precision = 10, scale = 2)
    private BigDecimal highPrice;

    @Column(name = "low_price", precision = 10, scale = 2)
    private BigDecimal lowPrice;

    @Column(name = "volume")
    private Long volume;
}
