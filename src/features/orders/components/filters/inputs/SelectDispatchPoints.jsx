import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";

import { DispatchPointsServices } from "../../../services/dispatch-points.services";
import { useAuthStore } from "../../../../../app/store/UseAuthStore";

export default function SelectDispatchPoints({
  label,
  value,
  inputId,
  disabled,
  size = "small",
  onChange,
  selected,
}) {
  const { currentCompanyId } = useAuthStore();
  const [options, setOptions] = useState([]);

  const getDispatchPoints = async () => {
    try {
      const response = await DispatchPointsServices.getDispatchPoints({
        company_id: currentCompanyId(),
      });
      setOptions(response.data.data);
      onChange(response.data.data[0]?.id ?? null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedOption = options.find((option) => option.id === value);
    selected(selectedOption ?? null);
  }, [value, options]);

  useEffect(() => {
    getDispatchPoints();
  }, []);

  const sizeClass = useMemo(() => {
    switch (size) {
      case "small":
        return "p-inputtext-sm";
      case "large":
        return "p-inputtext-lg";
      default:
        return "";
    }
  }, [size]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="font-medium">
        {label}
      </label>
      <Dropdown
        value={value}
        options={options}
        optionLabel="name"
        optionValue="id"
        className={"w-full " + sizeClass}
        disabled={disabled}
        onChange={(e) => onChange(e.value) && onChange(e.value)}
      />
    </div>
  );
}
