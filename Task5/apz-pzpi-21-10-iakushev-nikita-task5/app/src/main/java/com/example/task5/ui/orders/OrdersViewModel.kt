package com.example.task5.ui.orders

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.task5.models.Order
import com.example.task5.controllers.OrderController

class OrdersViewModel : ViewModel() {

    private val _orders = MutableLiveData<List<Order>>()
    val orders: LiveData<List<Order>> = _orders

    fun loadOrders() {
        OrderController.getOrders { orders ->
            _orders.postValue(orders ?: emptyList())
        }
    }
}
