import SelectDispatchPoints from "./SelectDispatchPoints";
import InputNumberCustom from "../../../app/shared/form-control/InputNumberCustom";

export default function FiltersOrders({ filters, onChange, onSearch }) {
  return (
    <div className="flex flex-wrap mb-2 gap-2">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <SelectDispatchPoints
          inputId="dispatch_point_id"
          label="Punto de despacho"
          value={filters.dispatch_point_id}
          onChange={(value) => {
            onChange({ dispatch_point_id: value });
            onSearch();
          }}
        />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4">
        <InputNumberCustom
          inputId="invoice_document_number"
          label="Buscar"
          value={filters.invoice_document_number}
          onChange={(value) => onChange({ invoice_document_number: value })}
          onEnter={onSearch}
        />
      </div>
    </div>
  );
}
