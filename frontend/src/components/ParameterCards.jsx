import React from "react";
import { Zap, Activity, Triangle } from "lucide-react";

const ParameterCard = ({
    title,
    value,
    unit,
    icon,
    color,
    progress
}) => (

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[200px] flex flex-col justify-between">

        <div>

            <div className="flex justify-between items-start mb-5">

                <h3 className="text-gray-800 font-semibold text-[17px]">
                    {title}
                </h3>

                <div className={`p-2.5 rounded-full ${color.bg}`}>
                    {icon}
                </div>

            </div>

            <div className="flex items-baseline gap-1.5 mb-5">

                <span className="text-[42px] font-bold text-gray-800 leading-none">
                    {value}
                </span>

                <span className="text-lg text-gray-500 font-medium">
                    {unit}
                </span>

            </div>

        </div>

        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-auto">

            <div
                className={`h-full rounded-full ${color.fill}`}
                style={{ width: `${progress}%` }}
            />

        </div>

    </div>

);

const ParameterCards = ({ liveData }) => {

    console.log("LIVE DATA:", liveData);

    if (!liveData || !liveData.sync_engine) {

        return (
            <div className="text-2xl font-semibold text-gray-500">
                Waiting for Live Data...
            </div>
        );

    }

    const sync = liveData.sync_engine;

    const parameters = [

        {
            title: "Grid Voltage",
            value: sync.grid_voltage ?? 0,
            unit: "V",
            progress: 60,
            color: {
                bg: "bg-yellow-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Zap
                    size={22}
                    className="text-yellow-500"
                    fill="currentColor"
                />
            )
        },

        {
            title: "Grid Frequency",
            value: sync.grid_frequency ?? 0,
            unit: "Hz",
            progress: 75,
            color: {
                bg: "bg-blue-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Activity
                    size={22}
                    className="text-blue-500"
                />
            )
        },

        {
            title: "Grid Phase Angle",
            value: sync.phase_angle ?? 0,
            unit: "°",
            progress: 85,
            color: {
                bg: "bg-orange-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Triangle
                    size={22}
                    className="text-orange-500"
                />
            )
        },

        {
            title: "Generator Voltage",
            value: sync.generator_voltage ?? 0,
            unit: "V",
            progress: 45,
            color: {
                bg: "bg-green-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Zap
                    size={22}
                    className="text-green-500"
                    fill="currentColor"
                />
            )
        },

        {
            title: "Generator Frequency",
            value: sync.generator_frequency ?? 0,
            unit: "Hz",
            progress: 70,
            color: {
                bg: "bg-purple-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Activity
                    size={22}
                    className="text-purple-500"
                />
            )
        },

        {
            title: "Generator Phase Angle",
            value: sync.phase_angle ?? 0,
            unit: "°",
            progress: 85,
            color: {
                bg: "bg-orange-50",
                fill: "bg-yellow-400"
            },
            icon: (
                <Triangle
                    size={22}
                    className="text-orange-500"
                />
            )
        }

    ];

    return (

        <div className="grid grid-cols-3 gap-6">

            {
                parameters.map((param, index) => (

                    <ParameterCard
                        key={index}
                        {...param}
                    />

                ))
            }

        </div>

    );

};

export default ParameterCards;