import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";

export default function InputTextRHF({
  control,
  name,
  label,
  rules = {},
  placeholder = "",
  type = "text",
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputText
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={error ? "p-invalid" : ""}
            />
            {error && <small className="text-red-500">{error.message}</small>}
          </>
        )}
      />
    </div>
  );
}
