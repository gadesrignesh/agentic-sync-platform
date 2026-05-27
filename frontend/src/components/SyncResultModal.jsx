import React, { useEffect } from "react";

const SyncResultModal = ({
    result,
    onClose
}) => {

    // =========================================
    // AUTO CLOSE WHEN SYNCHRONIZED
    // =========================================

    useEffect(() => {

        if (result?.synchronized) {

            const timer = setTimeout(() => {

                onClose();

            }, 3000);

            return () => clearTimeout(timer);

        }

    }, [result, onClose]);

    if (!result) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-[650px] bg-white rounded-[30px] shadow-2xl p-8 animate-fadeIn">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-[34px] font-bold text-[#0f172a]">

                            {
                                result.synchronized
                                    ? "Synchronization Successful"
                                    : "Synchronization Failed"
                            }

                        </h1>

                        <p className="text-gray-500 mt-1">

                            AI synchronization analysis completed

                        </p>

                    </div>

                    <div
                        className={`
                            w-16 h-16 rounded-full flex items-center justify-center text-3xl
                            ${result.synchronized
                                ? "bg-green-100"
                                : "bg-red-100"}
                        `}
                    >

                        {
                            result.synchronized
                                ? "✅"
                                : "❌"
                        }

                    </div>

                </div>

                {/* STATUS */}

                <div
                    className={`
                        mt-6 rounded-2xl p-5 border
                        ${result.synchronized
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"}
                    `}
                >

                    <h2
                        className={`
                            text-2xl font-bold
                            ${result.synchronized
                                ? "text-green-600"
                                : "text-red-600"}
                        `}
                    >

                        {result.status}

                    </h2>

                    <p className="text-gray-600 mt-1">

                        Confidence Score: {result.confidence}%

                    </p>

                </div>

                {/* REASONS */}

                <div className="mt-6">

                    <h3 className="text-xl font-bold text-[#0f172a]">

                        Reasons

                    </h3>

                    <div className="mt-3 flex flex-col gap-3">

                        {
                            result.reasons.map((reason, index) => (

                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                                >

                                    • {reason}

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* RECOMMENDATIONS */}

                <div className="mt-6">

                    <h3 className="text-xl font-bold text-[#0f172a]">

                        AI Recommendations

                    </h3>

                    <div className="mt-3 flex flex-col gap-3">

                        {
                            result.recommendations.map((item, index) => (

                                <div
                                    key={index}
                                    className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-gray-700"
                                >

                                    ⚡ {item}

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* FOOTER */}

                <div className="mt-8 flex justify-end">

                    <button
                        onClick={onClose}
                        className="px-7 py-3 rounded-2xl bg-[#facc15] text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

};

export default SyncResultModal;