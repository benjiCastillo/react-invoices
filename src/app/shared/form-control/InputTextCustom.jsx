import { InputText } from "primereact/inputtext";
import { useMemo } from "react";

export default function InputTextCustom({
  id,
  label,
  size,
  placeholder,
  disabled = false,
  required = false,
  error,
  ...fieldProps
}) {
  const sizeClass = useMemo(() => {
    if (!size) return "";
    if (size === "small") return "p-inputtext-sm";
    if (size === "medium") return "p-inputtext-md";
    return "";
  }, [size]);

  return (
    <>
      <label
        htmlFor={id}
        className={`block mb-1 ${required ? "required" : ""}`}
      >
        {label}
      </label>

      <InputText
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        aria-describedby={id + "-error"}
        className={`w-full ${sizeClass} ${error ? "p-invalid" : ""}`}
        {...fieldProps}
      />

      {error && (
        <small id={id + "-error"} className="block mt-1 text-red-500">
          {error}
        </small>
      )}
    </>
  );
}
