import React from "react";

export default function Row({ data }) {
  return (
    <div className="w-full h-full bg-white rounded-md flex items-center justify-between px-3">
      <div className="h-full w-[50%] flex items-center justify-start">
        <img src={data.logo} alt="logo" className="h-28 w-28 px -5" />
        <div className="flex flex-col h-full justify-between py-5 px-5">
          <h1 className="text-xl font-bold">{data.company}</h1>
          <p className="font-semibold">{data.position}</p>
          <div className="flex">
            {data.experience} | {data.contract} | {data.location}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full  gap-5">
        {data.technology.map((item) => (
          <div
            key={item}
            className="px-4 py-2 bg-[#cefff3be] rounded-md text-lg font-semibold"
          >
            <p>{item}</p>
          </div>
        ))}
        <div className="px-4 py-2 bg-[#cefff3be] rounded-md text-lg font-semibold">
          <p>{data.ctc}-LPA</p>
        </div>
      </div>
    </div>
  );
}
