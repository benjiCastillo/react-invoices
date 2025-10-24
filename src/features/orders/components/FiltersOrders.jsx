import { useState } from "react";
import SelectDispatchPoints from "./filters/SelectDispatchPoints";
import InputNumberCustom from "../../../app/shared/form-control/InputNumberCustom";
import CardHeader from "./filters/CardHeader";

export default function FiltersOrders({ filters, onChange, onTrigger }) {
  const [selectedDispatchPoint, setSelectedDispatchPoint] = useState(null);

  return (
    <>
      <div className="flex flex-wrap mb-2 gap-2">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <SelectDispatchPoints
            inputId="dispatch_point_id"
            label="Punto de despacho"
            value={filters.dispatch_point_id}
            onChange={(value) => {
              onChange({ dispatch_point_id: value });
              onTrigger(); 
            }}
            selected={(value) => {
              setSelectedDispatchPoint(value);
            }}
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <InputNumberCustom
            inputId="invoice_document_number"
            label="Nro. de factura"
            value={filters.invoice_document_number}
            onChange={(value) => onChange({ invoice_document_number: value })}
            onEnter={onTrigger}
          />
        </div>
      </div>
      <CardHeader dispatchPointSelected={selectedDispatchPoint} />
    </>
  );
}
