import React from 'react';
import { Bot, Hand, ShieldAlert } from 'lucide-react';

const StatusCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* AI Mode Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="bg-green-50 p-3 rounded-full">
          <Bot size={28} className="text-green-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">AI MODE</p>
          <p className="text-lg font-bold text-green-600">AUTONOMOUS</p>
          <p className="text-xs text-gray-400">AI actively optimizing</p>
        </div>
      </div>

      {/* Control Mode Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="bg-yellow-50 p-3 rounded-full">
          <Hand size={28} className="text-yellow-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">CONTROL MODE</p>
          <p className="text-lg font-bold text-yellow-500">MANUAL</p>
          <p className="text-xs text-gray-400">Manual control enabled</p>
        </div>
      </div>

      {/* Sync Status Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="bg-red-50 p-3 rounded-full">
          <ShieldAlert size={28} className="text-red-500" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">SYNC STATUS</p>
          <p className="text-lg font-bold text-red-500">NOT SYNCHRONIZED</p>
          <p className="text-xs text-gray-400">System not ready for sync</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;