import { Tag } from "primereact/tag";

export default function DeliveryTypeTag({ deliveryType }) {

   const deliveryTypeMap = {
    "DINE-IN" : "PARA LA MESA",
    "TAKEAWAY" : "PARA LLEVAR",
    "DELIVERY" : "DELIVERY",
   };

   const severityMap = {
    "DINE-IN" : "primary",
    "TAKEAWAY" : "warning",
    "DELIVERY" : "success",
   };

   const deliveryTypeValue = deliveryTypeMap[deliveryType] ?? "-";

   const deliveryTypeSeverity = severityMap[deliveryType] ?? "info";

  return (
    <Tag value={deliveryTypeValue} severity={deliveryTypeSeverity} size="small" />
  );
}
