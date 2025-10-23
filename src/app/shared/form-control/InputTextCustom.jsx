import { InputText } from "primereact/inputtext";

export default function InputTextCustom({
  label,
  value,
  type = "text",
  inputId,
  disabled = false,
  placeholder = "",
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
      <InputText
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      />
    </div>
  );
}
