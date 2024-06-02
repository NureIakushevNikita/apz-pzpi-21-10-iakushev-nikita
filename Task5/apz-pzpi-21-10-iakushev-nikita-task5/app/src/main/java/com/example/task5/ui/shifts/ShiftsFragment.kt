package com.example.task5.ui.shifts

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.task5.controllers.ShiftsController
import com.example.task5.databinding.FragmentShiftsBinding
import com.example.task5.models.Shift
import com.example.task5.ui.home.TokenViewModel

class ShiftsFragment : Fragment() {

    private var _binding: FragmentShiftsBinding? = null
    private val binding get() = _binding!!
    private lateinit var shiftsAdapter: ShiftsAdapter
    private val tokenViewModel: TokenViewModel by activityViewModels()
    private val userIdViewModel: UserIdViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentShiftsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.recyclerViewShifts.layoutManager = LinearLayoutManager(context)
        shiftsAdapter = ShiftsAdapter(requireContext(), emptyList())
        binding.recyclerViewShifts.adapter = shiftsAdapter

        binding.toggleButton.setOnCheckedChangeListener { _, isChecked ->
            loadShifts(isChecked)
        }

        userIdViewModel.id.observe(viewLifecycleOwner) { id ->
            if (id != null) {
                loadShifts(binding.toggleButton.isChecked)
            } else {
                Toast.makeText(context, "Token not found", Toast.LENGTH_SHORT).show()
            }
        }

        return root
    }

    private fun loadShifts(showFutureShifts: Boolean) {

        var workerId = 1

        userIdViewModel.id.observe(viewLifecycleOwner) {id ->
            if (id != null){
                workerId = id
            }
        }

        if (showFutureShifts) {
            ShiftsController.getFutureShifts(workerId) { shifts ->
                println(shifts)
                if (shifts != null) {
                    shiftsAdapter.updateShifts(shifts)
                } else {
                    Toast.makeText(context, "Failed to load future shifts", Toast.LENGTH_SHORT).show()
                }
            }
        } else {
            ShiftsController.getShifts(workerId) { shifts ->
                if (shifts != null) {
                    shiftsAdapter.updateShifts(shifts)
                } else {
                    Toast.makeText(context, "Failed to load shifts", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
