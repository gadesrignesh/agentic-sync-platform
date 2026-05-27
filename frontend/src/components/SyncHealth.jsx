const SyncHealth = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Synchronization Health
      </h2>

      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full border-[18px] border-yellow-400 flex items-center justify-center">

          <div className="text-center">
            <h1 className="text-5xl font-bold text-yellow-500">
              82%
            </h1>

            <p className="text-gray-500 mt-2">
              HEALTH SCORE
            </p>
          </div>

        </div>
      </div>

      <div className="mt-8">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-[82%] h-full bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SyncHealth;