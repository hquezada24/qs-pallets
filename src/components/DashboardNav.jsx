import React from "react";

function HomeGrid({ bg, text }) {
  const bgColorClass =
    {
      blue: "bg-blue-200",
      red: "bg-red-200",
      green: "bg-green-200",
      yellow: "bg-yellow-200",
    }[bg] || "bg-gray-500";

  return (
    <div className={`${bgColorClass} rounded-[10px] px-5 py-5 `}>{text}</div>
  );
}

export default HomeGrid;
