export default function OrderItems({ orderItem }) {
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
      <td className="px-1 py-2" width="10%"></td>
    </tr>
  );
}
