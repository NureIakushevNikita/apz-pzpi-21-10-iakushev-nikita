package com.example.task5.ui.orders

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.task5.R
import com.example.task5.models.Order

class OrderAdapter(private val orders: List<Order>) : RecyclerView.Adapter<OrderAdapter.OrderViewHolder>() {

    class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val orderId: TextView = itemView.findViewById(R.id.order_id)
        val orderDate: TextView = itemView.findViewById(R.id.order_date)
        val orderType: TextView = itemView.findViewById(R.id.order_type)
        val orderAddress: TextView = itemView.findViewById(R.id.order_address)
        val orderState: TextView = itemView.findViewById(R.id.order_state)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.order_item, parent, false)
        return OrderViewHolder(view)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = orders[position]
        holder.orderId.text = "Id: ${order.id}"
        holder.orderDate.text = order.date.toString()
        holder.orderType.text = order.order_type
        holder.orderAddress.text = order.address
        holder.orderState.text = order.order_state
    }

    override fun getItemCount() = orders.size
}