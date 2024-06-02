package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.Worker
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object WorkerController {
    fun getProfile(token: String, onResult: (Worker?) -> Unit) {
        val call = RetrofitInstance.api.getProfile("Bearer $token")

        call.enqueue(object : Callback<Worker> {
            override fun onResponse(call: Call<Worker>, response: Response<Worker>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<Worker>, t: Throwable) {
                onResult(null)
            }
        })
    }
}