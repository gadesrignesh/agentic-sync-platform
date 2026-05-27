import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    connectWebSocket
} from "../services/websocket";

import {
    Play,
    Pause,
    RotateCcw,
    ShieldAlert,
    Bot,
    Hand
} from "lucide-react";

const Simulation = () => {

    const [liveData, setLiveData] = useState(null);

    const [mode, setMode] = useState("AUTO");

    const [simulationRunning, setSimulationRunning] = useState(true);

    // =========================================
    // WEBSOCKET
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("Simulation Data:", data);

            setLiveData(data);

        });

        return () => {

            if (socket) {

                socket.close();

            }

        };

    }, []);

    // =========================================
    // SAFE DATA EXTRACTION
    // =========================================

    const sync = liveData?.sync_engine || {};

    // =========================================
    // CONTROL FUNCTIONS
    // =========================================

    const handleStart = () => {

        setSimulationRunning(true);

    };

    const handleStop = () => {

        setSimulationRunning(false);

    };

    const handleReset = () => {

        window.location.reload();

    };

    const toggleMode = () => {

        setMode((prev) =>

            prev === "AUTO"
                ? "MANUAL"
                : "AUTO"

        );

    };

    // =========================================
    // LOADING SCREEN
    // =========================================

    if (!liveData) {

        return (

            <div className="flex h-screen bg-[#f5f7fb]">

                <Sidebar />

                <div className="flex-1 flex items-center justify-center">

                    <h1 className="text-3xl font-bold text-gray-500">

                        Connecting Simulation System...

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

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        Simulation Control Center

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Autonomous AI Generator Synchronization Simulation

                    </p>

                </div>

                {/* STATUS CARDS */}

                <div className="grid grid-cols-3 gap-5 mb-8">

                    {/* SIMULATION STATUS */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-lg font-semibold text-[#0f172a] mb-5">

                            Simulation Status

                        </h2>

                        <h1
                            className={`text-4xl font-bold
                            ${
                                simulationRunning
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                        >

                            {
                                simulationRunning
                                ? "RUNNING"
                                : "STOPPED"
                            }

                        </h1>

                    </div>

                    {/* CONTROL MODE */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-lg font-semibold text-[#0f172a] mb-5">

                            Control Mode

                        </h2>

                        <div className="flex items-center gap-3">

                            {
                                mode === "AUTO"
                                ? <Bot className="text-yellow-500" />
                                : <Hand className="text-blue-500" />
                            }

                            <h1 className="text-4xl font-bold text-[#0f172a]">

                                {mode}

                            </h1>

                        </div>

                    </div>

                    {/* SYNC STATUS */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

                        <h2 className="text-lg font-semibold text-[#0f172a] mb-5">

                            Synchronization

                        </h2>

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

                    </div>

                </div>

                {/* CONTROL BUTTONS */}

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">

                    <h2 className="text-2xl font-bold text-[#0f172a] mb-8">

                        Simulation Controls

                    </h2>

                    <div className="grid grid-cols-4 gap-5">

                        {/* START */}

                        <button
                            onClick={handleStart}
                            className="bg-green-50 hover:bg-green-100 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center"
                        >

                            <Play className="text-green-500 mb-3" size={36} />

                            <span className="font-semibold text-green-600">

                                Start

                            </span>

                        </button>

                        {/* STOP */}

                        <button
                            onClick={handleStop}
                            className="bg-red-50 hover:bg-red-100 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center"
                        >

                            <Pause className="text-red-500 mb-3" size={36} />

                            <span className="font-semibold text-red-600">

                                Stop

                            </span>

                        </button>

                        {/* RESET */}

                        <button
                            onClick={handleReset}
                            className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center"
                        >

                            <RotateCcw className="text-blue-500 mb-3" size={36} />

                            <span className="font-semibold text-blue-600">

                                Reset

                            </span>

                        </button>

                        {/* MODE */}

                        <button
                            onClick={toggleMode}
                            className="bg-yellow-50 hover:bg-yellow-100 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center"
                        >

                            <ShieldAlert className="text-yellow-500 mb-3" size={36} />

                            <span className="font-semibold text-yellow-600">

                                Toggle Mode

                            </span>

                        </button>

                    </div>

                </div>

                {/* LIVE VALUES */}

                <div className="grid grid-cols-3 gap-5">

                    {/* GRID VOLTAGE */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-semibold text-gray-600 mb-4">

                            Grid Voltage

                        </h2>

                        <h1 className="text-5xl font-bold text-yellow-500">

                            {sync?.grid_voltage || 0}

                        </h1>

                    </div>

                    {/* GENERATOR VOLTAGE */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-semibold text-gray-600 mb-4">

                            Generator Voltage

                        </h2>

                        <h1 className="text-5xl font-bold text-green-500">

                            {sync?.generator_voltage || 0}

                        </h1>

                    </div>

                    {/* PHASE ANGLE */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-semibold text-gray-600 mb-4">

                            Phase Angle

                        </h2>

                        <h1 className="text-5xl font-bold text-orange-500">

                            {sync?.phase_angle || 0}

                        </h1>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Simulation;