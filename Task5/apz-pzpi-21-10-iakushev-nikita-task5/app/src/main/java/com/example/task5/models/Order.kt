package com.example.task5.models

import java.util.Date

data class Order (
    val id: Int,
    val user_id: Int,
    val date: Date,
    val order_type: String,
    val address: String,
    val order_state: String
)