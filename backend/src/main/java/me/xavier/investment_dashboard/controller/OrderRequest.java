package me.xavier.investment_dashboard.controller;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderRequest {

    private Long userId;
    private String symbol;
    private String orderType;
    private Long quantity;
    private BigDecimal price;
    private String status;
}
