package com.example.task5.models

data class Worker(
    val id: Int,
    val email: String,
    val name: String,
    val lastname: String,
    val phone_number: String,
    val store_id: Int,
    val photo: String,
    val wage_per_hour_USD: Int
)