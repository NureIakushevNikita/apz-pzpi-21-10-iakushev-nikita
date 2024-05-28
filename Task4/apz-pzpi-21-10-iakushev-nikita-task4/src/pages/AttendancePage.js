import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../styles/AttendancePage.css';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import {Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const AttendancePage = () => {
    const [storeId, setStoreId] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [visits, setVisits] = useState([]);
    const [dates, setDates] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [advice, setAdvice] = useState('');
    const [trend, setTrend] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const data = {
        labels: dates,
        datasets:[
            {
                label: storeName,
                data: visits,
                backgroundColor: '#c0c2ff',
                borderBlockColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    const options = {

    }
    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const adminId = localStorage.getItem('id');
            const mallResponse = await axios.get(`${apiUrl}/admin/${adminId}`);
            const mallId = mallResponse.data.mall_id;

            const storesResponse = await axios.get(`${apiUrl}/store/mall/${mallId}`);
            setStores(storesResponse.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };


    const fetchAttendanceData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/attendanceDailyCount/store/${storeId}/range/${dateFrom}/${dateTo}`);
            const response1 = await axios.get(`${apiUrl}/store/${storeId}`);

            setAttendanceData(response.data);
            setVisits(attendanceData.map(item => item.visits));
            setDates(attendanceData.map(item => format(new Date(item.date), 'dd-MM-yyyy')));
            setStoreName(response1.data.name);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            setIsLoading(false);
        }
    };

    const fetchAdvice = async () => {
        try {
            const response = await axios.get(`${apiUrl}/attendanceAnalyze/store/${storeId}`);
            setTrend(response.data.trend);
            setAdvice(response.data.advice);
        } catch (error) {
            console.error('Error fetching advice:', error);
        }
    };


    const handleSubmit = (e) => {
        fetchAttendanceData();
        fetchAdvice();
        e.preventDefault();
    };

    return (
        <div className="attendance-page">
            <h1>Attendance</h1>
            {advice && trend && (
                <div className="advice-container">
                    <h2>Trend: {trend}</h2>
                    <p>{advice}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Store:</label>
                    <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
                        <option value="">Select a store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date From:</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Date To:</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} required />
                </div>
                <button type="submit">Get chart</button>
            </form>
            <div className="chart-container">
                {attendanceData.length > 0 ? (
                    <div>
                        <Bar
                            data={data}
                            options={options}
                        ></Bar>
                    </div>
                ) : <div>No data to display</div>}
            </div>

        </div>
    );
};

export default AttendancePage;
