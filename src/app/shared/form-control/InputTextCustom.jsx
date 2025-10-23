import { InputText } from "primereact/inputtext";

export default function InputTextCustom({
  label,
  value,
  type = "text",
  inputId,
  disabled = false,
  placeholder = "",
  size = "small",
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
      <InputText
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={sizeClass}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      />
    </div>
  );
}
