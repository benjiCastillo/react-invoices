import OrderItems from "./OrderItems";
import DeliveryTypeTag from "./DeliveryTypeTag";

export default function CardOrder({ order }) {
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
        
      </div>

      <div className="flex bg-amber-100 p-2 my-2">
        <table className="w-full">
          {order.sale_items.map((orderItem) => (
            <tbody key={orderItem.id}>
              <OrderItems orderItem={orderItem} />
            </tbody>
          ))}
        </table>
      </div>

      <div className="flex justify-end mt-auto pt-2"></div>
    </div>
  );
}
