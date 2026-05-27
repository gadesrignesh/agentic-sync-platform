import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    connectWebSocket
} from "../services/websocket";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";

const WaveformSync = () => {

    const [liveData, setLiveData] = useState(null);

    const [chartData, setChartData] = useState([]);

    // =========================================
    // WEBSOCKET
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("Waveform Data:", data);

            setLiveData(data);

            // SAFE CHECK

            if (!data?.sync_engine) return;

            const values = data.sync_engine;

            const point = {

                time: new Date().toLocaleTimeString(),

                gridVoltage: values?.grid_voltage || 0,

                generatorVoltage: values?.generator_voltage || 0,

                gridFrequency: values?.grid_frequency || 0,

                generatorFrequency: values?.generator_frequency || 0,

                phaseAngle: values?.phase_angle || 0

            };

            setChartData((prev) => {

                const updated = [...prev, point];

                return updated.slice(-15);

            });

        });

        return () => {

            if (socket) {

                socket.close();

            }

        };

    }, []);

    // =========================================
    // LOADING SCREEN
    // =========================================

    if (!liveData) {

        return (

            <div className="flex h-screen bg-[#f5f7fb]">

                <Sidebar />

                <div className="flex-1 flex items-center justify-center">

                    <h1 className="text-3xl font-bold text-gray-500">

                        Connecting to Live Waveforms...

                    </h1>

                </div>

            </div>

        );

    }

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* PAGE TITLE */}

                <div className="mb-6">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        Waveform Synchronization

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Real-time Generator and Grid Waveform Monitoring

                    </p>

                </div>

                {/* CHART SECTION */}

                <div className="space-y-6">

                    {/* VOLTAGE CHART */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-2xl font-bold text-[#0f172a] mb-5">

                            Voltage Synchronization

                        </h2>

                        <ResponsiveContainer width="100%" height={320}>

                            <LineChart data={chartData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="time" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="gridVoltage"
                                    stroke="#facc15"
                                    strokeWidth={3}
                                    dot={false}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="generatorVoltage"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    dot={false}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    {/* FREQUENCY CHART */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-2xl font-bold text-[#0f172a] mb-5">

                            Frequency Synchronization

                        </h2>

                        <ResponsiveContainer width="100%" height={320}>

                            <LineChart data={chartData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="time" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="gridFrequency"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={false}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="generatorFrequency"
                                    stroke="#a855f7"
                                    strokeWidth={3}
                                    dot={false}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    {/* PHASE ANGLE CHART */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-2xl font-bold text-[#0f172a] mb-5">

                            Phase Angle Monitoring

                        </h2>

                        <ResponsiveContainer width="100%" height={320}>

                            <LineChart data={chartData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="time" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="phaseAngle"
                                    stroke="#f97316"
                                    strokeWidth={3}
                                    dot={false}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default WaveformSync;