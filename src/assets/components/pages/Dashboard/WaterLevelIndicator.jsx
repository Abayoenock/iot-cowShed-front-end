import React from "react"

const WaterLevelIndicator = ({ level }) => {
  return (
    <div className="relative w-fit">
      <div className=" w-[160px] h-[100px] transparent relative rounded-b-md overflow-hidden border-8 border-gray-300 border-t-0  ">
        <div
          className=" absolute bottom-0 bg-water   w-full left-0 transition-all duration-500"
          style={{ height: level }}
        >
          <div className=" w-full h-full bg-blue-700 bg-opacity-70 backdrop-blur-[0.5px]"></div>
        </div>
      </div>
      <div className=" absolute w-[40px] aspect-square bg-gray-200 text-black font-bold text-[13px] flex justify-center items-center top-0 -right-[32px]">
        {" "}
        {level}
      </div>
    </div>
  )
}

export default WaterLevelIndicator
