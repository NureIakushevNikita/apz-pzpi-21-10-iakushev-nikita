package com.example.task5.models

import java.util.Date

data class Shift(
    val id: Int,
    val worker_id: Int,
    val start_time: Date,
    val end_time: Date,
    val schedule: Int
)