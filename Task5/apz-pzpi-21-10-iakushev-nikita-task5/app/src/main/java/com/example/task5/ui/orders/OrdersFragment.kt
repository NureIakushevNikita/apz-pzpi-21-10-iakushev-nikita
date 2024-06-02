package com.example.task5.ui.orders

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.task5.R
import com.example.task5.databinding.FragmentOrdersBinding
import com.example.task5.models.Order
import com.example.task5.controllers.OrderController
import com.example.task5.controllers.UserController
import java.text.SimpleDateFormat
import java.util.Locale

class OrdersFragment : Fragment() {

    private var _binding: FragmentOrdersBinding? = null
    private val binding get() = _binding!!
    private lateinit var ordersViewModel: OrdersViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        ordersViewModel = ViewModelProvider(this).get(OrdersViewModel::class.java)
        _binding = FragmentOrdersBinding.inflate(inflater, container, false)

        ordersViewModel.orders.observe(viewLifecycleOwner) { orders ->
            addOrdersToLayout(orders)
        }

        ordersViewModel.loadOrders()

        return binding.root
    }

    private fun addOrdersToLayout(orders: List<Order>) {
        val linearLayout = binding.linearLayoutOrders

        linearLayout.removeAllViews()

        val dateFormat = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())

        for (order in orders) {

            val orderView = LayoutInflater.from(context).inflate(R.layout.order_item, linearLayout, false)

            val orderId = orderView.findViewById<TextView>(R.id.order_id)
            val orderDate = orderView.findViewById<TextView>(R.id.order_date)
            val orderType = orderView.findViewById<TextView>(R.id.order_type)
            val orderAddress = orderView.findViewById<TextView>(R.id.order_address)
            val orderState = orderView.findViewById<TextView>(R.id.order_state)
            val userName = orderView.findViewById<TextView>(R.id.user_name)
            val userLastname = orderView.findViewById<TextView>(R.id.user_lastname)
            val userPhone = orderView.findViewById<TextView>(R.id.user_phone_number)
            val updateButton = orderView.findViewById<Button>(R.id.update_order_state_button)

            UserController.getUserById(order.user_id) { user ->
                userName.text = getString(R.string.name, user?.name)
                userLastname.text = getString(R.string.lastname, user?.lastname)
                userPhone.text = getString(R.string.phone, user?.phone_number)
            }

            orderId.text = getString(R.string.id, order.id)
            orderDate.text = getString(R.string.date_order, dateFormat.format(order.date))
            orderType.text = getString(R.string.order_type, order.order_type)
            orderAddress.text = getString(R.string.address, order.address)
            orderState.text = getString(R.string.state, order.order_state)

            updateButton.setOnClickListener {
                updateOrderState(order.id)
            }

            linearLayout.addView(orderView)
        }
    }

    private fun updateOrderState(orderId: Int) {
        OrderController.updateOrderState(orderId) { result ->
            if (result != null) {
                Toast.makeText(context, result, Toast.LENGTH_SHORT).show()
                ordersViewModel.loadOrders()
            } else {
                Toast.makeText(context, getString(R.string.change_order_state_err), Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun getUserById(userId: Int) {
        UserController.getUserById(userId) { user ->
            if (user != null) {

            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
