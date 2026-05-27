const ActivityLog = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          AI Agent Activity
        </h2>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
          ACTIVE
        </div>
      </div>

      <div className="space-y-4">
        <LogItem
          color="bg-red-500"
          text="Frequency mismatch detected"
        />

        <LogItem
          color="bg-yellow-500"
          text="Increasing generator speed"
        />

        <LogItem
          color="bg-blue-500"
          text="Adjusting excitation voltage"
        />

        <LogItem
          color="bg-orange-500"
          text="Phase angle correction running"
        />

        <LogItem
          color="bg-green-500"
          text="AI optimization active"
        />
      </div>
    </div>
  );
};

const LogItem = ({ color, text }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-4 py-4">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>

      <p className="text-gray-700 font-medium">
        {text}
      </p>
    </div>
  );
};

export default ActivityLog;