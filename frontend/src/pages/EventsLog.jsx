import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    connectWebSocket
} from "../services/websocket";

import {
    ClipboardList,
    AlertTriangle,
    CheckCircle2,
    BrainCircuit
} from "lucide-react";

const EventsLog = () => {

    const [logs, setLogs] = useState([]);

    // =========================================
    // WEBSOCKET
    // =========================================

    useEffect(() => {

        const socket = connectWebSocket((data) => {

            console.log("Events Data:", data);

            // SAFE CHECK

            if (!data?.sync_engine) return;

            const sync = data?.sync_engine || {};

            const ai = data?.ai_analysis || {};

            const recommendations = ai?.ai_recommendations || [];

            const time = new Date().toLocaleTimeString();

            let newLogs = [];

            // =========================================
            // AI RECOMMENDATIONS
            // =========================================

            recommendations.forEach((item) => {

                newLogs.push({

                    type: "AI",

                    icon: <BrainCircuit className="text-yellow-500" />,

                    message: item,

                    time

                });

            });

            // =========================================
            // SYNC STATUS
            // =========================================

            if (sync?.sync_status) {

                newLogs.push({

                    type: "SUCCESS",

                    icon: <CheckCircle2 className="text-green-500" />,

                    message: "Synchronization Conditions Achieved",

                    time

                });

            } else {

                newLogs.push({

                    type: "WARNING",

                    icon: <AlertTriangle className="text-red-500" />,

                    message: "Synchronization Conditions Not Met",

                    time

                });

            }

            // =========================================
            // UPDATE LOGS
            // =========================================

            setLogs((prev) => {

                const updated = [...newLogs, ...prev];

                return updated.slice(0, 20);

            });

        });

        return () => {

            if (socket) {

                socket.close();

            }

        };

    }, []);

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        Events Log

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Real-time AI Events, Synchronization Logs & System Warnings

                    </p>

                </div>

                {/* LOG CONTAINER */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    <div className="flex items-center gap-3 mb-6">

                        <ClipboardList className="text-yellow-500" />

                        <h2 className="text-2xl font-bold text-[#0f172a]">

                            Live System Logs

                        </h2>

                    </div>

                    {/* LOGS */}

                    <div className="space-y-4">

                        {

                            logs.length > 0 ? (

                                logs.map((log, index) => (

                                    <div
                                        key={index}
                                        className="flex items-start justify-between bg-[#f8fafc] border border-gray-100 rounded-2xl p-5"
                                    >

                                        <div className="flex items-start gap-4">

                                            <div className="mt-1">

                                                {log.icon}

                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-[#0f172a]">

                                                    {log.type}

                                                </h3>

                                                <p className="text-gray-600 mt-1">

                                                    {log.message}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="text-sm text-gray-400">

                                            {log.time}

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 text-gray-500 text-lg">

                                    No system logs available.

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EventsLog;