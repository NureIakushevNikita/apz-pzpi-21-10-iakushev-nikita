import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ShiftsPage.css';

const ShiftsPage = () => {
    const { id } = useParams();
    const [shifts, setShifts] = useState([]);
    const [showFutureShifts, setShowFutureShifts] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/${showFutureShifts ? 'futureShift' : 'shift'}/${id}`);
                setShifts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching shifts:', error);
                setIsLoading(false);
            }
        };
        fetchShifts();
    }, [showFutureShifts, id]);

    const handleGenerateShifts = async () => {
        try {
            await axios.post(`${apiUrl}/generateShifts/${id}`);
            alert('Shifts generated successfully');
            const response = await axios.get(`${apiUrl}/${showFutureShifts ? 'futureShift' : 'shift'}/${id}`);
            setShifts(response.data);
        } catch (error) {
            console.error('Error generating shifts:', error);
            alert('Failed to generate shifts');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shifts-page">
            <h1>Shifts for Worker #{id}</h1>
            <div className="actions">
                <button className="generate-shifts-button" onClick={handleGenerateShifts}>
                    Generate shifts for worker
                </button>
                <div className="toggle">
                    <label>Show future shifts</label>
                    <input
                        type="checkbox"
                        checked={showFutureShifts}
                        onChange={() => setShowFutureShifts(!showFutureShifts)}
                    />
                </div>
            </div>
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

export default ShiftsPage;
