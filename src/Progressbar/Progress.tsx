const Progress = ({ progressState = 0 }) => {
  const getColor = () => {
    if (progressState > 59) return "green";
    if (progressState > 29) return "yellow";
    return "red";
  };

  const textColor = progressState > 29 ? "text-black" : "text-white";

  return (
    <div className="w-full relative">
      <div className="w-full h-8 rounded-2xl overflow-hidden bg-gray-200">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressState}%`,
            background: getColor(),
          }}
        />
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center font-medium ${textColor}`}
      >
        {progressState}%
      </div>
    </div>
  );
};

export default Progress;
