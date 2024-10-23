package me.xavier.investment_dashboard.controller;

import me.xavier.investment_dashboard.model.Order;
import me.xavier.investment_dashboard.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/me")
    public List<Order> getOrdersForAuthenticatedUser() {
        return orderService.getOrdersForAuthenticatedUser();
    }

    @PostMapping
    public Order creatUser(@RequestBody OrderRequest orderRequest) {
        return orderService.save(orderRequest.getUserId(), orderRequest.getSymbol(), orderRequest.getOrderType(), orderRequest.getQuantity());
    }
}
