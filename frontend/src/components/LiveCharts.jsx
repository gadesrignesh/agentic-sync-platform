import React, { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const LiveCharts = ({ liveData }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        if (!liveData || !liveData.sync_engine) return;

        const values = liveData.sync_engine;

        const newPoint = {

            time: new Date().toLocaleTimeString(),

            gridVoltage: values.grid_voltage,

            generatorVoltage: values.generator_voltage,

            gridFrequency: values.grid_frequency,

            generatorFrequency: values.generator_frequency,

            phaseAngle: values.phase_angle

        };

        setChartData((prev) => {

            const updated = [...prev, newPoint];

            return updated.slice(-10);

        });

    }, [liveData]);

    return (

        <div className="grid grid-cols-2 gap-5 mt-5">

            {/* VOLTAGE CHART */}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Voltage Monitoring
                </h2>

                <ResponsiveContainer width="100%" height={250}>

                    <LineChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="gridVoltage"
                            stroke="#facc15"
                            strokeWidth={3}
                        />

                        <Line
                            type="monotone"
                            dataKey="generatorVoltage"
                            stroke="#22c55e"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* FREQUENCY CHART */}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Frequency Monitoring
                </h2>

                <ResponsiveContainer width="100%" height={250}>

                    <LineChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="gridFrequency"
                            stroke="#3b82f6"
                            strokeWidth={3}
                        />

                        <Line
                            type="monotone"
                            dataKey="generatorFrequency"
                            stroke="#a855f7"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* PHASE ANGLE CHART */}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 col-span-2">

                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Phase Angle Monitoring
                </h2>

                <ResponsiveContainer width="100%" height={260}>

                    <LineChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="phaseAngle"
                            stroke="#f97316"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default LiveCharts;