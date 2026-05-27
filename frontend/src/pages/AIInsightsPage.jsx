import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    connectWebSocket
} from "../services/websocket";

import {
    BrainCircuit,
    ShieldAlert,
    ShieldCheck,
    Activity
} from "lucide-react";

const AIInsights = () => {

    const [liveData, setLiveData] = useState(null);

    // =========================================
    // WEBSOCKET
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("AI Insights Data:", data);

            setLiveData(data);

        });

        return () => {

            if (socket) {

                socket.close();

            }

        };

    }, []);

    // =========================================
    // LOADING
    // =========================================

    if (!liveData) {

        return (

            <div className="flex h-screen bg-[#f5f7fb]">

                <Sidebar />

                <div className="flex-1 flex items-center justify-center">

                    <h1 className="text-3xl font-bold text-gray-500">

                        Connecting AI Insights...

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
    // SAFE RECOMMENDATIONS
    // =========================================

    const recommendations = ai?.ai_recommendations || [];

    // =========================================
    // RISK LEVEL
    // =========================================

    const confidence = ai?.confidence_score || 0;

    const riskLevel = confidence > 80
        ? "LOW"
        : confidence > 50
        ? "MEDIUM"
        : "HIGH";

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        AI Insights

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Autonomous AI Decision Intelligence & Synchronization Analysis

                    </p>

                </div>

                {/* TOP CARDS */}

                <div className="grid grid-cols-3 gap-5 mb-6">

                    {/* CONFIDENCE */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Confidence

                            </h2>

                            <BrainCircuit className="text-yellow-500" />

                        </div>

                        <h1 className="text-5xl font-bold text-[#0f172a]">

                            {confidence}%

                        </h1>

                        <p className="text-gray-500 mt-3">

                            AI synchronization confidence

                        </p>

                    </div>

                    {/* RISK */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Risk Level

                            </h2>

                            <ShieldAlert className="text-red-500" />

                        </div>

                        <h1
                            className={`text-5xl font-bold
                            ${
                                riskLevel === "LOW"
                                ? "text-green-500"
                                : riskLevel === "MEDIUM"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                        >

                            {riskLevel}

                        </h1>

                        <p className="text-gray-500 mt-3">

                            Current synchronization risk

                        </p>

                    </div>

                    {/* STATUS */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-lg font-semibold text-[#0f172a]">

                                Synchronization

                            </h2>

                            <ShieldCheck className="text-green-500" />

                        </div>

                        <h1
                            className={`text-4xl font-bold
                            ${
                                sync?.sync_status
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                        >

                            {
                                sync?.sync_status
                                ? "READY"
                                : "NOT READY"
                            }

                        </h1>

                        <p className="text-gray-500 mt-3">

                            AI synchronization readiness

                        </p>

                    </div>

                </div>

                {/* AI RECOMMENDATIONS */}

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">

                    <div className="flex items-center gap-3 mb-6">

                        <Activity className="text-yellow-500" />

                        <h2 className="text-2xl font-bold text-[#0f172a]">

                            AI Recommendations

                        </h2>

                    </div>

                    <div className="space-y-4">

                        {

                            recommendations.length > 0 ? (

                                recommendations.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 text-gray-700 text-lg"
                                    >

                                        {item}

                                    </div>

                                ))

                            ) : (

                                <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 text-gray-500 text-lg">

                                    No AI recommendations available.

                                </div>

                            )

                        }

                    </div>

                </div>

                {/* SYSTEM ANALYTICS */}

                <div className="grid grid-cols-2 gap-5">

                    {/* VOLTAGE */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-xl font-bold text-[#0f172a] mb-5">

                            Voltage Difference

                        </h2>

                        <h1 className="text-5xl font-bold text-yellow-500">

                            {sync?.voltage_difference || 0}

                        </h1>

                        <p className="text-gray-500 mt-3">

                            Generator vs Grid voltage mismatch

                        </p>

                    </div>

                    {/* FREQUENCY */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-xl font-bold text-[#0f172a] mb-5">

                            Frequency Difference

                        </h2>

                        <h1 className="text-5xl font-bold text-purple-500">

                            {sync?.frequency_difference || 0}

                        </h1>

                        <p className="text-gray-500 mt-3">

                            Generator vs Grid frequency mismatch

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AIInsights;