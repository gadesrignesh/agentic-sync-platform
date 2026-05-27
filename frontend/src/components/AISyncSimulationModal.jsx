import React, { useEffect, useState } from "react";

const AISyncSimulationModal = ({ open, onClose }) => {

    // =========================================
    // GRID VALUES
    // =========================================

    const gridVoltage = 110;
    const gridFrequency = 50;
    const gridPhase = 5;

    // =========================================
    // GENERATOR VALUES
    // =========================================

    const [generatorVoltage, setGeneratorVoltage] = useState(128);
    const [generatorFrequency, setGeneratorFrequency] = useState(54);
    const [generatorPhase, setGeneratorPhase] = useState(24);

    // =========================================
    // LOGS & STATUS
    // =========================================

    const [logs, setLogs] = useState([]);
    const [synchronized, setSynchronized] = useState(false);

    // =========================================
    // ADD LOG
    // =========================================

    const addLog = (message) => {

        setLogs((prev) => [

            message,

            ...prev.slice(0, 8)

        ]);

    };

    // =========================================
    // AI SIMULATION
    // =========================================

    useEffect(() => {

        if (!open) return;

        const interval = setInterval(() => {

            setGeneratorVoltage((prev) => {

                if (prev > gridVoltage) {

                    addLog("AI reducing generator voltage");

                    return prev - 2;

                }

                return prev;

            });

            setGeneratorFrequency((prev) => {

                if (prev > gridFrequency) {

                    addLog("AI correcting frequency");

                    return prev - 0.5;

                }

                return prev;

            });

            setGeneratorPhase((prev) => {

                if (prev > gridPhase) {

                    addLog("AI correcting phase angle");

                    return prev - 2;

                }

                return prev;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [open]);

    // =========================================
    // SYNCHRONIZATION CHECK
    // =========================================

    useEffect(() => {

        const voltageOk =
            Math.abs(generatorVoltage - gridVoltage) <= 5;

        const frequencyOk =
            Math.abs(generatorFrequency - gridFrequency) <= 0.5;

        const phaseOk =
            Math.abs(generatorPhase - gridPhase) <= 10;

        if (
            voltageOk &&
            frequencyOk &&
            phaseOk &&
            !synchronized
        ) {

            setSynchronized(true);

            addLog("Synchronization completed successfully");
            addLog("Breaker closing command issued");
            addLog("Generator synchronized with grid");

            setTimeout(() => {

                onClose();

            }, 10000);

        }

    }, [
        generatorVoltage,
        generatorFrequency,
        generatorPhase,
        synchronized,
        onClose
    ]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

            {/* MAIN MODAL */}

            <div
                className="
                    w-full
                    max-w-5xl
                    h-[88vh]
                    bg-white
                    rounded-[28px]
                    shadow-2xl
                    px-6
                    py-5
                    overflow-y-auto
                    flex
                    flex-col
                "
            >

                {/* HEADER */}

                <div className="flex items-center justify-between mb-5">

                    <div>

                        <h1 className="text-[30px] font-bold text-[#0f172a]">
                            Autonomous Synchronization
                        </h1>

                        <p className="text-gray-500 mt-1">
                            AI is synchronizing generator with grid
                        </p>

                    </div>

                    <div
                        className={`px-5 py-2 rounded-full text-sm font-bold ${
                            synchronized
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >

                        {
                            synchronized
                                ? "SYNCHRONIZED"
                                : "IN PROGRESS"
                        }

                    </div>

                </div>

                {/* MAIN SECTION */}

                <div className="grid grid-cols-3 gap-4 items-center">

                    {/* GRID */}

                    <div className="bg-[#f8fafc] rounded-[22px] border border-gray-100 p-4">

                        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
                            GRID
                        </h2>

                        <div className="space-y-3">

                            <ValueCard
                                label="Voltage"
                                value={`${gridVoltage} V`}
                            />

                            <ValueCard
                                label="Frequency"
                                value={`${gridFrequency} Hz`}
                            />

                            <ValueCard
                                label="Phase Angle"
                                value={`${gridPhase}°`}
                            />

                        </div>

                    </div>

                    {/* RELAY */}

                    <div className="flex flex-col items-center justify-center">

                        <div
                            className={`
                                w-28
                                h-28
                                rounded-full
                                flex
                                items-center
                                justify-center
                                text-5xl
                                shadow-xl
                                transition-all
                                duration-500

                                ${
                                    synchronized
                                        ? "bg-green-100"
                                        : "bg-yellow-100"
                                }
                            `}
                        >

                            ⚡

                        </div>

                        <h2 className="mt-4 text-[22px] font-bold text-[#0f172a] text-center leading-tight">

                            Synchronizing
                            <br />
                            Relay

                        </h2>

                    </div>

                    {/* GENERATOR */}

                    <div className="bg-[#f8fafc] rounded-[22px] border border-gray-100 p-4">

                        <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                            GENERATOR
                        </h2>

                        <div className="space-y-3">

                            <ValueCard
                                label="Voltage"
                                value={`${generatorVoltage.toFixed(1)} V`}
                            />

                            <ValueCard
                                label="Frequency"
                                value={`${generatorFrequency.toFixed(1)} Hz`}
                            />

                            <ValueCard
                                label="Phase Angle"
                                value={`${generatorPhase.toFixed(1)}°`}
                            />

                        </div>

                    </div>

                </div>

                {/* LOGS */}

                <div className="mt-5 flex-1 flex flex-col min-h-0">

                    <h2 className="text-[24px] font-bold text-[#0f172a] mb-4">

                        AI Synchronization Logs

                    </h2>

                    <div className="space-y-3 overflow-y-auto pr-2 flex-1">

                        {
                            logs.map((log, index) => (

                                <div
                                    key={index}
                                    className="
                                        bg-gray-50
                                        border
                                        border-gray-200
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-gray-700
                                        text-[15px]
                                    "
                                >

                                    ⚡ {log}

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

// =========================================
// VALUE CARD
// =========================================

const ValueCard = ({ label, value }) => {

    return (

        <div className="bg-white rounded-[16px] border border-gray-100 px-4 py-3 shadow-sm">

            <p className="text-gray-500 text-sm">
                {label}
            </p>

            <h2 className="text-[18px] font-bold text-[#0f172a] mt-1">
                {value}
            </h2>

        </div>

    );

};

export default AISyncSimulationModal;