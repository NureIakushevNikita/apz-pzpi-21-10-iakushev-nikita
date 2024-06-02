package com.example.task5.models

data class AuthResponse(
    val token: String,
    val id: Int,
    val role: String
)