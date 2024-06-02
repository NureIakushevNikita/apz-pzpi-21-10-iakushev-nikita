package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.AuthRequest
import com.example.task5.models.AuthResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object AuthController {
    fun loginUser(email: String, password: String, onResult: (AuthResponse?) -> Unit) {
        val authRequest = AuthRequest(email, password)
        val call = RetrofitInstance.api.loginUser(authRequest)

        call.enqueue(object : Callback<AuthResponse> {
            override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                onResult(null)
            }
        })
    }
}