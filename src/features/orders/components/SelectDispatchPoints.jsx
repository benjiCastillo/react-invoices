import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";

import { DispatchPointsServices } from "../services/dispatch-points.services";
import { useAuthStore } from "../../../app/store/UseAuthStore";

export default function SelectDispatchPoints({
  label,
  inputId,
  disabled,
  change,
}) {
  const { currentCompanyId } = useAuthStore();
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  const getDispatchPoints = async () => {
    try {
      const response = await DispatchPointsServices.getDispatchPoints({
        company_id: currentCompanyId(),
      });
      console.log(response.data.data);
      setOptions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setValue(event.value);
    // change(event.value);
  };

  useEffect(() => {
    getDispatchPoints();
  }, []);

  // useEffect(() => {
  //   change(value);
  // }, [value]);
  return (
    <>
      <label htmlFor={inputId} className="block mb-1">
        {label}
      </label>
      <Dropdown
        value={value}
        options={options}
        optionLabel="name"
        optionValue="id"
        className="w-full"
        disabled={disabled}
        onChange={handleChange}
      />
    </>
  );
}
