import React, { useEffect, useState } from "react";

export default function DropDown({
  label,
  id,
  name,
  optionParam,
  data,
  handleChange,
}) {
  const [options, setOptions] = useState([]);
  const makeOtions = () => {
    let temp = data.map((item) => item[optionParam]);
    const set = new Set(temp.flat());
    const temp1 = [];
    for (let item of set) {
      temp1.push(item);
    }
    return temp1;
  };
  useEffect(() => {
    if (data.length) {
      setOptions(makeOtions());
    }
  }, [data]);


  return (
    <div className="flex flex-col w-[20%]">
      <label htmlFor={name} className="uppercase pb-2 font-bold">{label}</label>

      <select
        name={name}
        id={id}
        className="rounded-md py-2 outline-none"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <option value={''} defaultValue className="text-gray-300">
            Nothing Selected
          </option>
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
