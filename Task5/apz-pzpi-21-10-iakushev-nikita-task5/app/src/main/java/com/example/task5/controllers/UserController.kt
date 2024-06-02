package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.User
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object UserController {
    fun getUserById(userId: Int, onResult: (User?) -> Unit) {
        val call = RetrofitInstance.api.getUserById(userId)

        call.enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                onResult(null)
            }
        })
    }
}