import React, { useEffect, useState } from "react";

export default function Slider({
  label,
  id,
  name,
  optionParam,
  data,
  value,
  handleChange,
}) {
  const [range, setRange] = useState([]);
  useEffect(() => {
    if (data.length) {
      const temp = data.map((item) => item[optionParam]);
      temp.sort((a, b) => a - b);
      setRange([temp[0], temp[temp.length - 1]]);
    }
  }, [data]);
  return (
    <div className="flex flex-col w-[20%]">
      <label htmlFor={name} className="uppercase pb-2 font-bold">
        {label}
      </label>
      <input
        type="range"
        min={range[0]}
        max={range[1]}
        id={id}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div className="flex justify-between font-semibold">
        <p>Min: {range[0]} LPA</p>
        <p>
           Max: {range[1]} LPA
        </p>
      </div>
    </div>
  );
}
