package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.ApiResponse
import com.example.task5.models.Order
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object OrderController {
    fun getOrders(onResult: (List<Order>?) -> Unit) {
        val call = RetrofitInstance.api.getOrders()

        call.enqueue(object : Callback<List<Order>> {
            override fun onResponse(call: Call<List<Order>>, response: Response<List<Order>>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<List<Order>>, t: Throwable) {
                onResult(null)
            }
        })
    }

    fun updateOrderState(orderId: Int, onResult: (String?) -> Unit) {
        val call = RetrofitInstance.api.updateOrderState(orderId)

        call.enqueue(object : Callback<ApiResponse> {
            override fun onResponse(call: Call<ApiResponse>, response: Response<ApiResponse>) {
                if (response.isSuccessful) {
                    onResult(response.body()?.message)
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<ApiResponse>, t: Throwable) {
                onResult(null)
            }
        })
    }



}