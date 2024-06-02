package com.example.task5.models

import java.util.Date

data class Store(
    val id: Int,
    val name: String,
    val type: String,
    val mall_id: Int,
    val floor: Int,
    val time_open: Date,
    val time_close: Date
)