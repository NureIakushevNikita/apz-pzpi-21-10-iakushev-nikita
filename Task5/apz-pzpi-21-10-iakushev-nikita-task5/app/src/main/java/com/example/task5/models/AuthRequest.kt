package com.example.task5.models

data class AuthRequest(
    val email: String,
    val password: String,
    val role: String = "worker"
)

