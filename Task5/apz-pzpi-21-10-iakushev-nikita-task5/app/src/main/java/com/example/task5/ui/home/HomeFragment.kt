package com.example.task5.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.bumptech.glide.Glide
import com.example.task5.R
import com.example.task5.controllers.StoreController
import com.example.task5.controllers.WorkerController
import com.example.task5.databinding.FragmentHomeBinding
import com.example.task5.models.Worker

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val tokenViewModel: TokenViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        tokenViewModel.token.observe(viewLifecycleOwner, Observer { token ->
            if (token != null) {
                loadProfile(token)
            } else {
                Toast.makeText(context, "Token not found", Toast.LENGTH_SHORT).show()
            }
        })

        return root
    }

    private fun loadProfile(token: String) {
        WorkerController.getProfile(token) { worker ->
            if (worker != null) {
                updateUI(worker)
            } else {
                Toast.makeText(context, "Failed to load profile", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun updateUI(worker: Worker) {
        binding.apply {

            StoreController.getStoreById(worker.store_id) {store ->
                profileStore.text = getString(R.string.store, store?.name)
            }

            profileName.text = "${worker.name} ${worker.lastname}"
            profileEmail.text = getString(R.string.email, worker.email)
            profilePhone.text = getString(R.string.phone, worker.phone_number)
            profileWage.text = getString(R.string.wage_hour, worker.wage_per_hour_USD)

            val photoUrl = "https://mallmanagementstorageacc.blob.core.windows.net/images/${worker.photo}"

            Glide.with(this@HomeFragment)
                .load(photoUrl)
                .into(profilePhoto)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

