export default function OptionsDeliveryTypes({
    value,
    options,
    disabled,
    onChange,
}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="delivery_type" className="font-medium">
                Tipo de entrega
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
        </div>
    );
}