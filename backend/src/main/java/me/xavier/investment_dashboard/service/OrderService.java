package me.xavier.investment_dashboard.service;

import me.xavier.investment_dashboard.model.Order;
import me.xavier.investment_dashboard.model.Stock;
import me.xavier.investment_dashboard.model.User;
import me.xavier.investment_dashboard.repository.OrderRepository;
import me.xavier.investment_dashboard.repository.StockRepository;
import me.xavier.investment_dashboard.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    public List<Order> getOrdersForAuthenticatedUser() {
        User authenticatedUser = userService.getAuthenticatedUser();
        return orderRepository.findByUserUserId(authenticatedUser.getUserId());
    }

    public Order save(Long userId, String symbol, String orderType, Long quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Find stock by name
        Stock stock = stockRepository.findBySymbol(symbol)
                .orElseThrow(() -> new IllegalArgumentException("Stock not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStock(stock);
        order.setOrderType(orderType);
        order.setQuantity(quantity);

        // Save the order to the database
        return orderRepository.save(order);
    }
}
