package com.example.task5

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import android.widget.Toast
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.task5.databinding.ActivityHomeBinding

import androidx.activity.viewModels
import com.example.task5.ui.home.TokenViewModel
import com.example.task5.ui.shifts.UserIdViewModel

class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding
    private val tokenViewModel: TokenViewModel by viewModels()
    private val userIdViewModel: UserIdViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar3)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_home)

        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home, R.id.navigation_orders, R.id.navigation_shifts
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        val token = intent.getStringExtra("TOKEN")
        val id = intent.getStringExtra("ID")
        if (token != null) {
            tokenViewModel.setToken(token)
        } else {
            Toast.makeText(this, "Token not found", Toast.LENGTH_SHORT).show()
            Toast.makeText(this, "Token not found", Toast.LENGTH_SHORT).show()
        }

        if (id != null) {
            userIdViewModel.setId(id.toInt())
        }
        else {
            Toast.makeText(this, "UserId not found", Toast.LENGTH_SHORT).show()
            Toast.makeText(this, "UserId not found", Toast.LENGTH_SHORT).show()
        }

        val logoutButton = findViewById<ImageButton>(R.id.logoutImageButton)

        logoutButton.setOnClickListener{
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
            Toast.makeText(this, getString(R.string.log_out_message), Toast.LENGTH_LONG).show()
        }
    }
}
