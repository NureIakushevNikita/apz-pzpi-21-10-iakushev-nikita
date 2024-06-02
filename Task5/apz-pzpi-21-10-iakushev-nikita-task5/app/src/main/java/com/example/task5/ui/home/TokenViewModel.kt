package com.example.task5.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TokenViewModel : ViewModel() {
    private val _token = MutableLiveData<String>()
    val token: LiveData<String> get() = _token

    fun setToken(newToken: String) {
        _token.value = newToken
    }
}
