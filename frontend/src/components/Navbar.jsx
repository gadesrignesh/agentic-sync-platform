import React, { useEffect, useState } from "react";

const Navbar = ({
  mode,
  setMode,
  openManualPopup
}) => {

  // ====================================
  // LIVE TIME & DATE
  // ====================================

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {

    const updateDateTime = () => {

      const now = new Date();

      const time = now.toLocaleTimeString();

      const date = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setCurrentTime(time);
      setCurrentDate(date);

    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);

  }, []);

  // ====================================
  // HANDLE TOGGLE
  // ====================================

  const handleToggle = () => {

    // ====================================
    // SWITCH TO MANUAL
    // ====================================

    if (mode === "ai") {

      setMode("manual");

      openManualPopup();

    }

    // ====================================
    // SWITCH TO AI
    // ====================================

    else {

      setMode("ai");

    }

  };

  return (

    <div className="bg-white rounded-[24px] px-8 py-5 border border-gray-100 shadow-sm">

      {/* TOP ROW */}
      <div className="flex justify-between items-center">

        {/* LEFT */}
        <div>

          <h1 className="text-[34px] font-bold leading-tight text-[#0f172a]">
            Welcome to SyncAI Dashboard
          </h1>

          <p className="text-gray-500 text-[16px] mt-1">
            Real-time Generator-Grid Synchronization Monitoring
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* TIME */}
          <div className="bg-white border border-gray-200 rounded-[18px] px-5 py-3 flex items-center gap-3 shadow-sm">

            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
              🕒
            </div>

            <div>

              <h2 className="text-[18px] font-bold text-[#0f172a]">
                {currentTime}
              </h2>

              <p className="text-gray-500 text-sm">
                {currentDate}
              </p>

            </div>

          </div>

          {/* BELL */}
          <div className="w-16 h-16 rounded-[18px] border border-gray-200 bg-white flex items-center justify-center text-2xl shadow-sm">
            🔔
          </div>

        </div>

      </div>

      {/* ==================================== */}
      {/* MODE + STATUS ROW */}
      {/* ==================================== */}

      <div className="flex items-center justify-between mt-3 gap-4">

        {/* ==================================== */}
        {/* PREMIUM MODE TOGGLE */}
        {/* ==================================== */}

        <div className="flex items-center justify-center gap-5 bg-[#fafafa] border border-gray-100 rounded-[24px] px-8 py-5 flex-1">

          {/* AI LABEL */}

          <div
            className={`
              text-[20px]
              font-bold
              transition-all
              duration-300

              ${
                mode === "ai"
                  ? "text-green-600 scale-105"
                  : "text-gray-300"
              }
            `}
          >

            🤖 AI MODE

            <p className="text-[12px] font-medium mt-1">

              Autonomous Synchronization

            </p>

          </div>

          {/* TOGGLE */}

          <div
            onClick={handleToggle}
            className={`
              relative
              w-[180px]
              h-[60px]
              rounded-full
              cursor-pointer
              transition-all
              duration-500
              flex
              items-center
              px-2
              shadow-inner

              ${
                mode === "ai"
                  ? "bg-green-200"
                  : "bg-yellow-200"
              }
            `}
          >

            {/* SLIDER */}

            <div
              className={`
                absolute
                w-[48px]
                h-[48px]
                rounded-full
                bg-white
                shadow-2xl
                flex
                items-center
                justify-center
                text-2xl
                transition-all
                duration-500

                ${
                  mode === "ai"
                    ? "left-2"
                    : "left-[122px]"
                }
              `}
            >

              {
                mode === "ai"
                  ? "🤖"
                  : "✋"
              }

            </div>

          </div>

          {/* MANUAL LABEL */}

          <div
            className={`
              text-[20px]
              font-bold
              transition-all
              duration-300

              ${
                mode === "manual"
                  ? "text-yellow-600 scale-105"
                  : "text-gray-300"
              }
            `}
          >

            ✋ MANUAL MODE

            <p className="text-[12px] font-medium mt-1">

              Operator Assisted Control

            </p>

          </div>

        </div>

        {/* ==================================== */}
        {/* SYNC STATUS */}
        {/* ==================================== */}

        <div className="w-[340px]">

          <StatusCard
            title="SYNC STATUS"
            value={
              mode === "ai"
                ? "AI ACTIVE"
                : "MANUAL ACTIVE"
            }
            desc={
              mode === "ai"
                ? "AI synchronization running"
                : "Operator synchronization mode"
            }
            color={
              mode === "ai"
                ? "text-green-500"
                : "text-yellow-500"
            }
            bg={
              mode === "ai"
                ? "bg-green-50"
                : "bg-yellow-50"
            }
            icon={
              mode === "ai"
                ? "⚡"
                : "🛠️"
            }
          />

        </div>

      </div>

    </div>

  );

};

const StatusCard = ({
  title,
  value,
  desc,
  color,
  bg,
  icon,
}) => {

  return (

    <div className="bg-[#fafafa] rounded-[18px] px-4 py-3 border border-gray-100 flex items-center gap-3">

      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center text-xl`}>
        {icon}
      </div>

      <div>

        <p className="text-gray-500 text-[12px]">
          {title}
        </p>

        <h2 className={`text-[18px] font-bold ${color} leading-tight`}>
          {value}
        </h2>

        <p className="text-gray-500 text-[12px]">
          {desc}
        </p>

      </div>

    </div>

  );

};

export default Navbar;