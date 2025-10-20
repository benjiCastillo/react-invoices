import { useEffect, useState } from "react";
import { Select } from "primereact/select";

import { DispatchPointsServices } from "../services/dispatch-points.services";

export default function SelectDispatchPoins({
  label,
  inputId,
  labelClass,
  disabled,
  change,
}) {
  const { value, setValue } = useState(null);
  const { options, setOptions } = useState([]);

  const getDispatchPoints = async () => {
    try {
      const response = await DispatchPointsServices.getDispatchPoints();
      setOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setValue(event.value);
    change(event.value);
  };

  useEffect(() => {
    getDispatchPoints();
  }, []);

  useEffect(() => {
    change(value);
  }, [value]);
  return (
    <>
      <label for={inputId} className={labelClass}>
        {label}
      </label>
      <Select
        value={value}
        options={options}
        option-label="name"
        option-value="id"
        className="w-full"
        disabled={disabled}
        onChange={handleChange}
      />
    </>
  );
}
