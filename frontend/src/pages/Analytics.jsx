import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    connectWebSocket
} from "../services/websocket";

import {
    TrendingUp,
    Gauge,
    Activity,
    ShieldCheck
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const Analytics = () => {

    const [liveData, setLiveData] = useState(null);

    // =========================================
    // WEBSOCKET
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("Analytics Data:", data);

            setLiveData(data);

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

                        Loading Analytics...

                    </h1>

                </div>

            </div>

        );

    }

    // =========================================
    // SAFE DATA EXTRACTION
    // =========================================

    const ai = liveData?.ai_analysis || {};

    const sync = liveData?.sync_engine || {};

    // =========================================
    // PIE CHART DATA
    // =========================================

    const syncData = [

        {
            name: "Confidence",
            value: ai.confidence_score || 0
        },

        {
            name: "Remaining",
            value: 100 - (ai.confidence_score || 0)
        }

    ];

    // =========================================
    // BAR CHART DATA
    // =========================================

    const analyticsData = [

        {
            name: "Voltage",
            value: sync.voltage_difference || 0
        },

        {
            name: "Frequency",
            value: sync.frequency_difference || 0
        },

        {
            name: "Phase",
            value: sync.phase_angle || 0
        }

    ];

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        Analytics Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        AI Performance, Synchronization KPIs & System Health Metrics

                    </p>

                </div>

                {/* KPI CARDS */}

                <div className="grid grid-cols-4 gap-5 mb-8">

                    {/* CONFIDENCE */}

                    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">

                        <div className="flex justify-between mb-3">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Confidence

                            </h2>

                            <TrendingUp className="text-yellow-500" />

                        </div>

                        <h1 className="text-5xl font-bold text-yellow-500">

                            {ai.confidence_score || 0}%

                        </h1>

                    </div>

                    {/* STABILITY */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Stability

                            </h2>

                            <Gauge className="text-green-500" />

                        </div>

                        <h1 className="text-5xl font-bold text-green-500">

                            {100 - (sync.phase_angle || 0)}%

                        </h1>

                    </div>

                    {/* VOLTAGE DIFF */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Voltage Diff

                            </h2>

                            <Activity className="text-blue-500" />

                        </div>

                        <h1 className="text-5xl font-bold text-blue-500">

                           {(sync.voltage_difference || 0).toFixed(4)}

                        </h1>

                    </div>

                    {/* SYNC STATUS */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Sync Status

                            </h2>

                            <ShieldCheck className="text-purple-500" />

                        </div>

                        <h1
                            className={`text-4xl font-bold ${
                                sync?.sync_status
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >

                            {sync?.sync_status ? "READY" : "WAIT"}

                        </h1>

                    </div>

                </div>

                {/* CHARTS */}

                <div className="grid grid-cols-2 gap-6">

                    {/* PIE CHART */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-2xl font-bold text-[#0f172a] mb-6">

                            AI Confidence Distribution

                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <PieChart>

                                <Pie
                                    data={syncData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    dataKey="value"
                                    label
                                >

                                    <Cell fill="#facc15" />

                                    <Cell fill="#e5e7eb" />

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    {/* BAR CHART */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-2xl font-bold text-[#0f172a] mb-6">

                            Synchronization Metrics

                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <BarChart data={analyticsData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    fill="#facc15"
                                    radius={[10, 10, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Analytics;