package com.example.task5.ui.shifts


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class UserIdViewModel : ViewModel() {

    private val _id = MutableLiveData<Int>()
    val id: LiveData<Int> get() = _id

    fun setId(newId: Int) {
        _id.value = newId
    }
}
