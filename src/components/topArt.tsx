import React from "react";

const TopArt = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex">
        <svg className="" xmlns="http://www.w3.org/2000/svg" width="50" height="75" viewBox="0 0 50 75" fill="none">
          <circle cx="2" cy="27" r="30" stroke="#F45867" strokeWidth="36" />
        </svg>
        <svg className="absolute " xmlns="http://www.w3.org/2000/svg" width="160" height="66" viewBox="0 0 160 66" fill="none">
          <circle cx="77.5" cy="-16.5" r="82.5" fill="#FFECE7" />
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="77" height="72" viewBox="0 0 77 72" fill="none">
        <circle cx="90.5" cy="-18.5" r="90.5" fill="#F45867" />
      </svg>
    </div>
  );
};

export default TopArt;
