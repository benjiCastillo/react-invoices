import { useState } from "react";
import { Button } from "primereact/button";
import OrderItems from "./OrderItems";
import DeliveryTypeTag from "./DeliveryTypeTag";
import TimerTag from "./TimerTag";

import { SaleItemsServices } from "../../services/sale-items.services";

export default function CardOrder({ order, delivered, successOrder }) {
  const [loading, setLoading] = useState(false);
  const handleDelivery = async () => {
    try {
      setLoading(true);
      await SaleItemsServices.bulkUpdateDeliveryStatus({
        sale_id: order.id,
        sale_item_ids: order.sale_items.map((item) => item.id),
        delivered: true,
      });
      delivered();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden p-2 hover:cursor-pointer flex flex-col h-full">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          #{order.invoices[0].document_number}
        </h3>
        <span className="text-xl font-semibold text-gray-900">
          {order.created_by}
        </span>
      </div>

      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          {order.invoices[0].nit_name}
        </h3>
      </div>

      <div className="flex justify-between items-center my-1">
        <DeliveryTypeTag deliveryType={order.delivery_type} />
        <TimerTag createdAt={order.created_at} />
      </div>

      <div className="flex bg-amber-100 p-2 my-2">
        <table className="w-full">
          {order.sale_items.map((orderItem) => (
            <tbody key={orderItem.id}>
              <OrderItems orderItem={orderItem} success={successOrder} />
            </tbody>
          ))}
        </table>
      </div>

      <div className="flex justify-end mt-auto pt-2">
        <Button
          label="Entregar"
          icon="pi pi-check"
          severity="primary"
          size="small"
          disabled={loading}
          loading={loading}
          onClick={handleDelivery}
        />
      </div>
    </div>
  );
}
