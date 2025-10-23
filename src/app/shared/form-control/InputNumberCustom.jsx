import { InputNumber } from "primereact/inputnumber";
import { useMemo } from "react";

export default function InputNumberCustom({
  label,
  value,
  inputId,
  size = "small",
  disabled = false,
  placeholder = "",
  useGrouping = false,
  minFractionDigits = useGrouping ? 2 : 0,
  maxFractionDigits = useGrouping ? 2 : 0,
  max = 2147483647,
  min = 0,
  locale = "en-US",
  onChange,
  onEnter,
}) {
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
      {label && (
        <label htmlFor={inputId} className="font-medium">
          {label}
        </label>
      )}
      <InputNumber
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={sizeClass}
        useGrouping={useGrouping}
        locale={locale}
        minFractionDigits={minFractionDigits}
        maxFractionDigits={maxFractionDigits}
        max={max}
        min={min}
        onChange={(e) => onChange(e.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      />
    </div>
  );
}
