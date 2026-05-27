import React from "react";

import {
    LayoutDashboard,
    Brain,
    Waves,
    BarChart3,
    ClipboardList,
    PlaySquare,
    Settings,
    Zap
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menuItems = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/dashboard"
        },

        {
            title: "AI Insights",
            icon: <Brain size={20} />,
            path: "/ai-insights"
        },

        {
            title: "Waveform Sync",
            icon: <Waves size={20} />,
            path: "/waveform-sync"
        },

        {
            title: "Analytics",
            icon: <BarChart3 size={20} />,
            path: "/analytics"
        },

        {
            title: "Events Log",
            icon: <ClipboardList size={20} />,
            path: "/events-log"
        },

        {
            title: "Simulation",
            icon: <PlaySquare size={20} />,
            path: "/simulation"
        },

        {
            title: "Settings",
            icon: <Settings size={20} />,
            path: "/settings"
        }

    ];

    return (

        <div className="w-[220px] h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col justify-between p-4">

            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <div>

                <div className="flex items-center gap-3 mb-10">

                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center">

                        <Zap
                            size={26}
                            className="text-white"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-[#0f172a]">
                            SyncAI
                        </h1>

                        <p className="text-xs text-gray-500">
                            Agentic AI Synchronizer
                        </p>

                    </div>

                </div>

                {/* ================================= */}
                {/* MENU */}
                {/* ================================= */}

                <div className="flex flex-col gap-2">

                    {

                        menuItems.map((item, index) => (

                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>

                                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium
                                    
                                    ${isActive
                                        ? "bg-yellow-100 text-[#0f172a]"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`

                                }
                            >

                                {item.icon}

                                <span className="text-[16px]">
                                    {item.title}
                                </span>

                            </NavLink>

                        ))

                    }

                </div>

            </div>

            {/* ================================= */}
            {/* SYSTEM STATUS */}
            {/* ================================= */}

            <div>

                <div className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-100 mb-4">

                    <h3 className="text-sm font-bold text-[#0f172a] mb-4">

                        SYSTEM STATUS

                    </h3>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                AI Agent
                            </span>

                            <span className="text-green-500 font-semibold">
                                ACTIVE
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Connection
                            </span>

                            <span className="text-green-500 font-semibold">
                                STABLE
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">
                                Data Stream
                            </span>

                            <span className="text-green-500 font-semibold">
                                LIVE
                            </span>

                        </div>

                    </div>

                </div>

                {/* ================================= */}
                {/* EMERGENCY BUTTON */}
                {/* ================================= */}

                <button className="w-full bg-red-50 hover:bg-red-100 transition-all duration-300 text-red-500 font-semibold py-4 rounded-2xl">

                    Emergency Stop

                </button>

            </div>

        </div>

    );

};

export default Sidebar;