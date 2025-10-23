import { InputNumber } from "primereact/inputnumber";

export default function InputNumberCustom({
  label,
  value,
  inputId,
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
