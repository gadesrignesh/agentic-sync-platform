import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ParameterCards from "../components/ParameterCards";
import LiveCharts from "../components/LiveCharts";
import AIInsights from "../components/AIInsights";
import SyncResultModal from "../components/SyncResultModal";
import AISyncSimulationModal from "../components/AISyncSimulationModal";
import { connectWebSocket } from "../services/websocket";
import AIChatAssistant from "../components/AIChatAssistant";

const Dashboard = () => {

    // =========================================
    // STATES
    // =========================================

    const [liveData, setLiveData] = useState(null);
    const [aiSimulationOpen, setAiSimulationOpen] = useState(false);

    const [mode, setMode] = useState("ai");

    const [manualPopupOpen, setManualPopupOpen] = useState(false);

    const [syncResult, setSyncResult] = useState(null);

    // =========================================
    // MANUAL INPUT STATES
    // =========================================

    const [gridVoltage, setGridVoltage] = useState(110);

    const [generatorVoltage, setGeneratorVoltage] = useState(108);

    const [gridFrequency, setGridFrequency] = useState(50);

    const [generatorFrequency, setGeneratorFrequency] = useState(49.8);

    const [phaseAngle, setPhaseAngle] = useState(5);

    // =========================================
    // ANALYZE FUNCTION
    // =========================================

    const handleAnalyze = async () => {

        try {

            const response = await fetch(

                "https://srignesh01-syncAI-backend.hf.space/analyze-sync",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        grid_voltage: gridVoltage,

                        generator_voltage: generatorVoltage,

                        grid_frequency: gridFrequency,

                        generator_frequency: generatorFrequency,

                        phase_angle: phaseAngle

                    })

                }

            );

            const data = await response.json();

            console.log("ANALYSIS RESULT:", data);

            // =========================================
            // SHOW PROFESSIONAL RESULT MODAL
            // =========================================

            setSyncResult(data);

            // =========================================
            // AUTO CLOSE MANUAL INPUT POPUP
            // =========================================

            setManualPopupOpen(false);

        } catch (error) {

            console.error(error);

            alert("Backend connection failed");

        }

    };

    // =========================================
    // WEBSOCKET CONNECTION
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("LIVE DATA:", data);

            setLiveData(data);

        });

        return () => {

            if (socket) {

                socket.close();

            }

        };

    }, []);

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* ========================================= */}
            {/* SIDEBAR */}
            {/* ========================================= */}

            <Sidebar />

            {/* ========================================= */}
            {/* MAIN CONTENT */}
            {/* ========================================= */}

            <div className="flex-1 p-4 overflow-hidden">

                {/* ========================================= */}
                {/* NAVBAR */}
                {/* ========================================= */}

               <Navbar
    liveData={liveData}

    mode={mode}

    setMode={(newMode) => {

        // ====================================
        // UPDATE MODE
        // ====================================

        setMode(newMode);

        // ====================================
        // OPEN AI SIMULATION
        // ====================================

        if (newMode === "ai") {

            setAiSimulationOpen(true);

        }

    }}

    openManualPopup={() => {

        setManualPopupOpen(true);

    }}
/>{
    aiSimulationOpen && (

        <AISyncSimulationModal

            open={aiSimulationOpen}

            onClose={() => {

                setAiSimulationOpen(false);

            }}

        />

    )
}
                

                {/* ========================================= */}
                {/* DASHBOARD BODY */}
                {/* ========================================= */}

                <div className="mt-4 h-[calc(100vh-170px)] overflow-y-auto pr-2">

                    {

                        !liveData ? (

                            <div className="h-full flex items-center justify-center">

                                <h1 className="text-3xl font-bold text-gray-500">

                                    Connecting to AI Synchronization System...

                                </h1>

                            </div>

                        ) : (

                            <div className="flex flex-col gap-5">

                                {/* ========================================= */}
                                {/* PARAMETER CARDS */}
                                {/* ========================================= */}

                                <ParameterCards liveData={liveData} />

                                {/* ========================================= */}
                                {/* LIVE CHARTS */}
                                {/* ========================================= */}

                                <LiveCharts liveData={liveData} />

                                {/* ========================================= */}
                                {/* AI INSIGHTS */}
                                {/* ========================================= */}

                                <AIInsights liveData={liveData} />

                            </div>

                        )

                    }

                </div>

            </div>

            {/* ========================================= */}
            {/* MANUAL MODE POPUP */}
            {/* ========================================= */}

            {

                manualPopupOpen && (

                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

                        <div className="bg-white w-[650px] rounded-3xl shadow-2xl p-8">

                            {/* HEADER */}

                            <div className="flex items-center justify-between mb-8">

                                <div>

                                    <h1 className="text-3xl font-bold text-[#0f172a]">

                                        Manual Synchronization

                                    </h1>

                                    <p className="text-gray-500 mt-1">

                                        Enter generator and grid values manually

                                    </p>

                                </div>

                                {/* CLOSE */}

                                <button
                                    onClick={() =>
                                        setManualPopupOpen(false)
                                    }
                                    className="text-2xl font-bold text-gray-400 hover:text-red-500 transition-all"
                                >

                                    ✕

                                </button>

                            </div>

                            {/* INPUTS */}

                            <div className="grid grid-cols-2 gap-5">

                                {/* GRID VOLTAGE */}

                                <div>

                                    <label className="text-sm font-semibold text-gray-600">

                                        Grid Voltage

                                    </label>

                                    <input
                                        type="number"
                                        value={gridVoltage}
                                        onChange={(e) =>
                                            setGridVoltage(e.target.value)
                                        }
                                        placeholder="110"
                                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none focus:border-yellow-400"
                                    />

                                </div>

                                {/* GENERATOR VOLTAGE */}

                                <div>

                                    <label className="text-sm font-semibold text-gray-600">

                                        Generator Voltage

                                    </label>

                                    <input
                                        type="number"
                                        value={generatorVoltage}
                                        onChange={(e) =>
                                            setGeneratorVoltage(e.target.value)
                                        }
                                        placeholder="108"
                                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none focus:border-yellow-400"
                                    />

                                </div>

                                {/* GRID FREQUENCY */}

                                <div>

                                    <label className="text-sm font-semibold text-gray-600">

                                        Grid Frequency

                                    </label>

                                    <input
                                        type="number"
                                        value={gridFrequency}
                                        onChange={(e) =>
                                            setGridFrequency(e.target.value)
                                        }
                                        placeholder="50"
                                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none focus:border-yellow-400"
                                    />

                                </div>

                                {/* GENERATOR FREQUENCY */}

                                <div>

                                    <label className="text-sm font-semibold text-gray-600">

                                        Generator Frequency

                                    </label>

                                    <input
                                        type="number"
                                        value={generatorFrequency}
                                        onChange={(e) =>
                                            setGeneratorFrequency(e.target.value)
                                        }
                                        placeholder="49.8"
                                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none focus:border-yellow-400"
                                    />

                                </div>

                                {/* PHASE ANGLE */}

                                <div className="col-span-2">

                                    <label className="text-sm font-semibold text-gray-600">

                                        Phase Angle

                                    </label>

                                    <input
                                        type="number"
                                        value={phaseAngle}
                                        onChange={(e) =>
                                            setPhaseAngle(e.target.value)
                                        }
                                        placeholder="5"
                                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none focus:border-yellow-400"
                                    />

                                </div>

                            </div>

                            {/* BUTTONS */}

                            <div className="flex items-center justify-end gap-4 mt-8">

                                {/* CANCEL */}

                                <button
                                    onClick={() =>
                                        setManualPopupOpen(false)
                                    }
                                    className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all font-semibold"
                                >

                                    Cancel

                                </button>

                                {/* ANALYZE */}

                                <button
                                    onClick={handleAnalyze}
                                    className="px-8 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 transition-all font-semibold text-white shadow-lg"
                                >

                                    Analyze Synchronization

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

            {/* ========================================= */}
            {/* RESULT MODAL */}
            {/* ========================================= */}

            {

                syncResult && (

                    <SyncResultModal
                        result={syncResult}
                        onClose={() => setSyncResult(null)}
                    />

                )

            }
<AIChatAssistant />
        </div>

    );

};

export default Dashboard;