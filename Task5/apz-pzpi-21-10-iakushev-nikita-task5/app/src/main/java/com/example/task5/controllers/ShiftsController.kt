package com.example.task5.controllers

import com.example.task5.api.RetrofitInstance
import com.example.task5.models.Shift
import com.example.task5.models.Worker
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object ShiftsController {
    fun getShifts(workerId: Int, onResult: (List<Shift>?) -> Unit) {
        val call = RetrofitInstance.api.getShifts(workerId)

        call.enqueue(object : Callback<List<Shift>> {
            override fun onResponse(call: Call<List<Shift>>, response: Response<List<Shift>>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<List<Shift>>, t: Throwable) {
                onResult(null)
            }
        })
    }

    fun getFutureShifts(workerId: Int, onResult: (List<Shift>?) -> Unit) {
        val call = RetrofitInstance.api.getFutureShifts(workerId)

        call.enqueue(object : Callback<List<Shift>> {
            override fun onResponse(call: Call<List<Shift>>, response: Response<List<Shift>>) {
                if (response.isSuccessful) {
                    onResult(response.body())
                } else {
                    onResult(null)
                }
            }

            override fun onFailure(call: Call<List<Shift>>, t: Throwable) {
                onResult(null)
            }
        })
    }
}