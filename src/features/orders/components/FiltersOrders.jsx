import SelectDispatchPoints from "./SelectDispatchPoints";

export default function FiltersOrders({filters}) {
  return (
    <div className="flex mb-2 gap-2">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <SelectDispatchPoints
          inputId="dispatch_point_id"
          label="Punto de despacho"
          value={filters.dispatch_point_id}
        />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4"></div>
    </div>
  );
}
