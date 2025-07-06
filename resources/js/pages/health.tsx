import { useState } from 'react';
import axios from 'axios';

type HealthData = {
    glucose?: number,
    cholesterol?: number,
    blood_pressure?: string,
    vitamin_d?: number,
    bmi?: number,
}

export default function Health() {
    const [healthData, setHealthData] = useState<HealthData>({});

    function getHealthData() {
        axios.get('api/health').then((response) => {
            setHealthData(response.data.labs);
        });
    }

    function resetHealthData() {
        setHealthData({})
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Health Check</h1>
            <button className="p-2 bg-amber-800" onClick={getHealthData}>Get Health Data</button>
            <button className="p-2 bg-blue-800" onClick={resetHealthData}>Reset</button>
            <div>
                <p>
                    <strong>Glucose:</strong> {healthData.glucose}
                </p>
                <p>
                    <strong>Cholesterol:</strong> {healthData.cholesterol}
                </p>
                <p>
                    <strong>Blood Pressure:</strong> {healthData.blood_pressure}
                </p>
                <p>
                    <strong>Vitamin D:</strong> {healthData.vitamin_d}
                </p>
                <p>
                    <strong>BMI:</strong> {healthData.bmi}
                </p>
            </div>
        </div>
    )
}
