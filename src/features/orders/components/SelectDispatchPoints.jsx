import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";

import { DispatchPointsServices } from "../services/dispatch-points.services";
import { useAuthStore } from "../../../app/store/UseAuthStore";

export default function SelectDispatchPoints({
  label,
  inputId,
  disabled,
  value,
  onChange,
}) {
  const { currentCompanyId } = useAuthStore();
  const [options, setOptions] = useState([]);

  const getDispatchPoints = async () => {
    try {
      const response = await DispatchPointsServices.getDispatchPoints({
        company_id: currentCompanyId(),
      });
      setOptions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getDispatchPoints();
  }, []);

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
        onChange={(e) => onChange(e.value) && onChange(e.value)}
      />
    </>
  );
}
