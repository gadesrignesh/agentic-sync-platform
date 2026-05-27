import React, { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    Settings as SettingsIcon,
    Save,
    ShieldCheck,
    SlidersHorizontal
} from "lucide-react";

const Settings = () => {

    const [settings, setSettings] = useState({

        voltageThreshold: 5,

        frequencyThreshold: 2,

        phaseThreshold: 10,

        autoSync: true,

        aiAggression: 70

    });

    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setSettings({

            ...settings,

            [name]:

                type === "checkbox"
                    ? checked
                    : value

        });

    };

    // =========================================
    // SAVE
    // =========================================

    const handleSave = () => {

        alert("Settings Saved Successfully");

    };

    return (

        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

            {/* ========================================= */}
            {/* SIDEBAR */}
            {/* ========================================= */}

            <Sidebar />

            {/* ========================================= */}
            {/* MAIN CONTENT */}
            {/* ========================================= */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#0f172a]">

                        System Settings

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Configure AI Synchronization Parameters & Control Policies

                    </p>

                </div>

                {/* ========================================= */}
                {/* SETTINGS PANEL */}
                {/* ========================================= */}

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

                    {/* ========================================= */}
                    {/* TITLE */}
                    {/* ========================================= */}

                    <div className="flex items-center gap-3 mb-8">

                        <SettingsIcon className="text-yellow-500" />

                        <h2 className="text-2xl font-bold text-[#0f172a]">

                            Synchronization Configuration

                        </h2>

                    </div>

                    {/* ========================================= */}
                    {/* FORM */}
                    {/* ========================================= */}

                    <div className="grid grid-cols-2 gap-8">

                        {/* VOLTAGE */}

                        <div>

                            <label className="block text-lg font-semibold text-[#0f172a] mb-3">

                                Voltage Threshold

                            </label>

                            <input
                                type="number"
                                name="voltageThreshold"
                                value={settings.voltageThreshold}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none focus:border-yellow-400"
                            />

                        </div>

                        {/* FREQUENCY */}

                        <div>

                            <label className="block text-lg font-semibold text-[#0f172a] mb-3">

                                Frequency Threshold

                            </label>

                            <input
                                type="number"
                                name="frequencyThreshold"
                                value={settings.frequencyThreshold}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none focus:border-yellow-400"
                            />

                        </div>

                        {/* PHASE */}

                        <div>

                            <label className="block text-lg font-semibold text-[#0f172a] mb-3">

                                Phase Angle Threshold

                            </label>

                            <input
                                type="number"
                                name="phaseThreshold"
                                value={settings.phaseThreshold}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg outline-none focus:border-yellow-400"
                            />

                        </div>

                        {/* AI AGGRESSION */}

                        <div>

                            <label className="block text-lg font-semibold text-[#0f172a] mb-3">

                                AI Aggression Level

                            </label>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                name="aiAggression"
                                value={settings.aiAggression}
                                onChange={handleChange}
                                className="w-full"
                            />

                            <div className="mt-2 text-yellow-500 font-bold text-lg">

                                {settings.aiAggression}%

                            </div>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* TOGGLES */}
                    {/* ========================================= */}

                    <div className="mt-10 space-y-6">

                        {/* AUTO SYNC */}

                        <div className="flex items-center justify-between bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-500" />

                                <div>

                                    <h3 className="font-bold text-[#0f172a]">

                                        Auto Synchronization

                                    </h3>

                                    <p className="text-gray-500">

                                        Allow AI to automatically synchronize the generator

                                    </p>

                                </div>

                            </div>

                            <input
                                type="checkbox"
                                name="autoSync"
                                checked={settings.autoSync}
                                onChange={handleChange}
                                className="w-6 h-6"
                            />

                        </div>

                        {/* AI MODE */}

                        <div className="flex items-center justify-between bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">

                            <div className="flex items-center gap-3">

                                <SlidersHorizontal className="text-yellow-500" />

                                <div>

                                    <h3 className="font-bold text-[#0f172a]">

                                        Intelligent AI Control

                                    </h3>

                                    <p className="text-gray-500">

                                        Enable predictive AI synchronization optimization

                                    </p>

                                </div>

                            </div>

                            <div className="text-green-500 font-bold">

                                ENABLED

                            </div>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* SAVE BUTTON */}
                    {/* ========================================= */}

                    <button
                        onClick={handleSave}
                        className="mt-10 bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
                    >

                        <Save size={20} />

                        Save Configuration

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Settings;