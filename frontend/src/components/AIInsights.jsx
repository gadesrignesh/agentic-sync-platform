import React from "react";

const AIInsights = ({ liveData }) => {

    if (!liveData) return null;

    const ai = liveData.ai_analysis;

    return (

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold text-[#0f172a]">

                    AI Insights

                </h2>

                <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

                    LIVE AI

                </div>

            </div>

            {/* CONFIDENCE */}

            <div className="mb-6">

                <div className="flex justify-between mb-2">

                    <span className="text-gray-600 font-medium">

                        Synchronization Confidence

                    </span>

                    <span className="font-bold text-[#0f172a]">

                        {ai.confidence_score}%

                    </span>

                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                        className="bg-yellow-400 h-full rounded-full"
                        style={{
                            width: `${ai.confidence_score}%`
                        }}
                    />

                </div>

            </div>

            {/* RECOMMENDATIONS */}

            <div>

                <h3 className="text-lg font-semibold text-[#0f172a] mb-3">

                    AI Recommendations

                </h3>

                <div className="space-y-3">

                    {

                        ai.ai_recommendations.map((item, index) => (

                            <div
                                key={index}
                                className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4 text-gray-700"
                            >

                                {item}

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default AIInsights;