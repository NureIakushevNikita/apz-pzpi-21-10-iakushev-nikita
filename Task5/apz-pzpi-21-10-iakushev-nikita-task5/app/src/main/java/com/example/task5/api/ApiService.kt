package com.example.task5.api

import com.example.task5.models.ApiResponse
import com.example.task5.models.AuthRequest
import com.example.task5.models.AuthResponse
import com.example.task5.models.Order
import com.example.task5.models.Shift
import com.example.task5.models.Store
import com.example.task5.models.User
import com.example.task5.models.Worker
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @POST("/login")
    fun loginUser(@Body authRequest: AuthRequest): Call<AuthResponse>

    @GET("/order")
    fun getOrders(): Call<List<Order>>

    @PUT("/order/{id}")
    fun updateOrderState(@Path("id") orderId: Int): Call<ApiResponse>

    @GET("/user/{id}")
    fun getUserById(@Path("id") userId: Int): Call<User>

    @GET("/worker/profile")
    fun getProfile(@Header("Authorization") token: String): Call<Worker>

    @GET("/store/{id}")
    fun getStoreById(@Path("id") storeId: Int): Call<Store>

    @GET("/shift/{workerId}")
    fun getShifts(@Path("workerId") workerId: Int): Call<List<Shift>>

    @GET("/futureShift/{workerId}")
    fun getFutureShifts(@Path("workerId") workerId: Int): Call<List<Shift>>
}