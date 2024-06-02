package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.Store
import com.example.task5.models.Worker
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object StoreController {
    fun getStoreById(storeId: Int, onResult: (Store?) -> Unit) {
        val call = RetrofitInstance.api.getStoreById(storeId)

        call.enqueue(object : Callback<Store> {
            override fun onResponse(call: Call<Store>, response: Response<Store>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<Store>, t: Throwable) {
                onResult(null)
            }
        })
    }
}