import React from "react";

import {
    Bot,
    Hand
} from "lucide-react";

import {
    useMode
} from "../context/ModeContext";

const ModeToggle = ({ onManualOpen }) => {

    const {
        mode,
        setMode
    } = useMode();

    const handleToggle = () => {

        if (mode === "AI") {

            setMode("MANUAL");

            onManualOpen();

        }

        else {

            setMode("AI");

        }

    };

    return (

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">

            {/* AI */}

            <div className="flex items-center gap-2">

                <Bot
                    size={22}
                    className={
                        mode === "AI"
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                />

                <span
                    className={`font-semibold
                    ${
                        mode === "AI"
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                >

                    AI MODE

                </span>

            </div>

            {/* TOGGLE */}

            <button
                onClick={handleToggle}
                className={`w-16 h-8 rounded-full transition-all duration-300 flex items-center px-1
                ${
                    mode === "AI"
                    ? "bg-yellow-400 justify-start"
                    : "bg-blue-400 justify-end"
                }`}
            >

                <div className="w-6 h-6 rounded-full bg-white shadow-md"></div>

            </button>

            {/* MANUAL */}

            <div className="flex items-center gap-2">

                <Hand
                    size={22}
                    className={
                        mode === "MANUAL"
                        ? "text-blue-500"
                        : "text-gray-400"
                    }
                />

                <span
                    className={`font-semibold
                    ${
                        mode === "MANUAL"
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                >

                    MANUAL MODE

                </span>

            </div>

        </div>

    );

};

export default ModeToggle;