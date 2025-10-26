import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { ProgressSpinner } from "primereact/progressspinner";

import { SaleItemsServices } from "../../services/sale-items.services";

export default function OrderItems({ orderItem , success}) {
  const [delivered, setDelivered] = useState(orderItem?.delivered ?? false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setDelivered(e.checked);
    handleDelivery();
  };

  const handleDelivery = async () => {
    setLoading(true);
    try {
      console.log(delivered);
      await SaleItemsServices.edit(orderItem.id, {
        delivered: !delivered,
        sale_id: orderItem.sale_id,
      });
      success();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-1 py-2" width="80%">
        <span className="font-bold block italic md:text-lg">
          {orderItem?.invoice_description ?? ""}
        </span>
        <span className="block italic ml-2">{orderItem?.note ?? ""}</span>
      </td>
      <td className="px-1 py-2 text-right font-bold" width="20%">
        {parseInt(orderItem?.quantity ?? 0)}
      </td>
      <td className="px-1 py-2" width="10%">
        {loading ? (
          <ProgressSpinner
            style={{ width: "22px", height: "22px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />
        ) : (
          <Checkbox
            onChange={handleCheckboxChange}
            checked={delivered}
            disabled={loading}
          ></Checkbox>
        )}
      </td>
    </tr>
  );
}
