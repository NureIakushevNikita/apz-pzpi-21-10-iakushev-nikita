import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MyShiftsPage.css';

const MyShiftsPage = () => {
    const [shifts, setShifts] = useState([]);
    const [showFutureShifts, setShowFutureShifts] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const workerId = localStorage.getItem('id');
                const response = await axios.get(`${apiUrl}/${showFutureShifts ? 'futureShift' : 'shift'}/${workerId}`);
                setShifts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching shifts:', error);
                setIsLoading(false);
            }
        };
        fetchShifts();
    }, [showFutureShifts]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const workerId = localStorage.getItem('id');
                // await axios.get(`http://localhost:3000/worker/schedule/${workerId}`);
            } catch (error) {
                console.error('Error fetching worker schedule:', error);
            }
        };
        fetchSchedule();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-shifts-page">
            <h1>My Shifts</h1>
            <div className="toggle">
                <label>Show future shifts</label>
                <input
                    type="checkbox"
                    checked={showFutureShifts}
                    onChange={() => setShowFutureShifts(!showFutureShifts)}
                />
            </div>
            <h3>Your work schedule is {shifts[0].schedule} in {shifts[0].schedule}.</h3>
            <div className="shifts-list">
                {shifts.map(shift => (
                    <div key={shift.id} className="shift">
                        <h2>{new Date(shift.start_time).toLocaleDateString()}</h2>
                        <p><strong>Start Time:</strong> {new Date(shift.start_time).toISOString().slice(11, 16)}</p>
                        <p><strong>End Time:</strong> {new Date(shift.end_time).toISOString().slice(11, 16)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyShiftsPage;
