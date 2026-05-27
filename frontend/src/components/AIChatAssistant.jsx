import React, { useState } from "react";

const AIChatAssistant = () => {

    // ====================================
    // STATES
    // ====================================

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([

        {
            sender: "ai",
            text: "Hello Operator. I am SyncAI Assistant."
        }

    ]);

    // ====================================
    // SEND MESSAGE
    // ====================================

    const handleSend = async () => {

        if (!input.trim()) return;

        // USER MESSAGE

        const userMessage = {

            sender: "user",

            text: input

        };

       // ====================================
// ADD USER MESSAGE
// ====================================

setMessages((prev) => [

    ...prev,

    userMessage

]);

// STORE INPUT

const currentMessage = input;

// CLEAR INPUT

setInput("");
// ====================================
// DASHBOARD LIVE DATA QUESTIONS
// ====================================

let aiReply = "";

const lower = currentMessage.toLowerCase();

// ====================================
// LIVE GRID + GENERATOR VALUES
// ====================================

if (

    lower.includes("present voltage")

    ||

    lower.includes("current voltage")

    ||

    lower.includes("grid voltage")

    ||

    lower.includes("generator voltage")

    ||

    lower.includes("present frequency")

    ||

    lower.includes("current frequency")

) {

    aiReply = `
Grid Voltage: 110 V
Grid Frequency: 50 Hz

Generator Voltage: 109.91 V
Generator Frequency: 49.92 Hz

Phase Angle: 0°
`;

}

// ====================================
// GEMINI AI FOR EVERYTHING ELSE
// ====================================

else {

    try {

        const response = await fetch(

            "https://srignesh01-syncai-backend.hf.space/chat",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    message: currentMessage

                })

            }

        );

        const data = await response.json();

        aiReply = data.reply;

    }

    catch (error) {

        aiReply =
            "Unable to connect with Gemini AI server.";

    }

}

// ====================================
// ADD AI MESSAGE
// ====================================

setMessages((prev) => [

    ...prev,

    {

        sender: "ai",

        text: aiReply

    }

]);
    };

    return (

        <>

            {/* ==================================== */}
            {/* FLOATING BUTTON */}
            {/* ==================================== */}

            <button
                onClick={() => setOpen(!open)}
                className="
                    fixed
                    bottom-6
                    right-6
                    z-50
                    bg-[#0f172a]
                    text-white
                    px-5
                    py-4
                    rounded-full
                    shadow-2xl
                    flex
                    items-center
                    gap-3
                    hover:scale-105
                    transition-all
                "
            >

                🤖 SyncAI Assistant

            </button>

            {/* ==================================== */}
            {/* CHAT WINDOW */}
            {/* ==================================== */}

            {

                open && (

                    <div
                        className="
                            fixed
                            bottom-24
                            right-6
                            z-50
                            w-[380px]
                            h-[600px]
                            bg-white
                            rounded-[28px]
                            shadow-2xl
                            border
                            border-gray-200
                            flex
                            flex-col
                            overflow-hidden
                        "
                    >

                        {/* HEADER */}

                        <div className="bg-[#0f172a] text-white px-5 py-4">

                            <h1 className="text-xl font-bold">

                                SyncAI Assistant

                            </h1>

                            <p className="text-sm text-gray-300 mt-1">

                                AI Power System Operator

                            </p>

                        </div>

                        {/* MESSAGES */}

                        <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] space-y-4">

                            {

                                messages.map((msg, index) => (

                                    <div
                                        key={index}
                                        className={`
                                            flex

                                            ${
                                                msg.sender === "user"

                                                    ? "justify-end"

                                                    : "justify-start"
                                            }
                                        `}
                                    >

                                        <div
                                            className={`
                                                max-w-[80%]
                                                px-4
                                                py-3
                                                rounded-2xl
                                                text-sm

                                                ${
                                                    msg.sender === "user"

                                                        ? "bg-[#0f172a] text-white"

                                                        : "bg-white border border-gray-200 text-gray-700"
                                                }
                                            `}
                                        >

                                            {msg.text}

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                        {/* INPUT */}

                        <div className="p-4 border-t border-gray-200 flex items-center gap-3">

                            <input
                                type="text"
                                placeholder="Ask SyncAI..."
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {

                                        handleSend();

                                    }

                                }}
                                className="
                                    flex-1
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    px-4
                                    py-3
                                    outline-none
                                "
                            />

                            <button
                                onClick={handleSend}
                                className="
                                    bg-yellow-400
                                    hover:bg-yellow-500
                                    text-white
                                    px-5
                                    py-3
                                    rounded-2xl
                                    font-bold
                                "
                            >

                                Send

                            </button>

                        </div>

                    </div>

                )

            }

        </>

    );

};

export default AIChatAssistant;
