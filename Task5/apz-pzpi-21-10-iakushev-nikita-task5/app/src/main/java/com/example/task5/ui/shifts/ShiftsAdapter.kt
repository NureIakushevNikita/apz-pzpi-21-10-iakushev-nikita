package com.example.task5.ui.shifts

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.task5.R
import com.example.task5.models.Shift
import java.text.SimpleDateFormat
import java.util.*

class ShiftsAdapter(private val context: Context, private var shifts: List<Shift>) : RecyclerView.Adapter<ShiftsAdapter.ShiftViewHolder>() {

    class ShiftViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val date: TextView = itemView.findViewById(R.id.date)
        val startTime: TextView = itemView.findViewById(R.id.startTime)
        val endTime: TextView = itemView.findViewById(R.id.endTime)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ShiftViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_shift, parent, false)
        return ShiftViewHolder(view)
    }

    override fun onBindViewHolder(holder: ShiftViewHolder, position: Int) {
        val shift = shifts[position]
        val dateFormatDate = SimpleDateFormat("dd-MM-yyyy")
        val dateFormatTime = SimpleDateFormat("HH:mm", Locale.getDefault())


        holder.date.text =
            context.getString(R.string.date_shift, dateFormatDate.format(shift.start_time))
        holder.startTime.text =
            context.getString(R.string.start_time, dateFormatTime.format(shift.start_time))
        holder.endTime.text =
            context.getString(R.string.end_time, dateFormatTime.format(shift.end_time))
    }

    override fun getItemCount(): Int = shifts.size

    fun updateShifts(newShifts: List<Shift>) {
        shifts = newShifts
        notifyDataSetChanged()
    }
}
