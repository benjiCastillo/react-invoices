import { Button } from "primereact/button";
import { formatCurrency } from "../../../../app/utils/formatCurrency";

import OrderAddMinus from "./OrderAddMinus";
import { useProductsStore } from "../../../pos/store/ProductsStore";

export default function OrderRow({ product }) {
  const subtotal = product.price * product.quantity;
  const { removeProduct } = useProductsStore();

  const handleRemoveProduct = () => {
    removeProduct(product.id);
  };

  return (
    <tr className="grid grid-cols-6 items-center gap-1 sm:table-row border-b border-gray-300">
      {/* <!-- Celda 1: ocupa toda la fila en mobile --> */}
      <td className="col-span-4 pb-0 px-1 py-2 sm:pb-2 sm:table-cell">
        <span className="block font-bold text-lg">{product.name}</span>
        <span className="block text-xl">
          {formatCurrency(product.price)} Bs.
        </span>
      </td>

      {/* <!-- Celda 2 --> */}
      <td className="col-span-3 sm:col-span-1 px-1 py-2 sm:table-cell">
        <OrderAddMinus product={product} />
      </td>

      {/* <!-- Celda 3 --> */}
      <td className="col-span-1 px-1 py-2 sm:table-cell">
        <Button icon="pi pi-clipboard" severity="secondary" />
      </td>

      {/* <!-- Celda 4 --> */}
      <td className="col-span-1 px-1 py-2 sm:table-cell sm:text-right">
        <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
      </td>

      {/* <!-- Celda 5 --> */}
      <td className="col-span-1 px-1 py-2 sm:table-cell">
        <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={handleRemoveProduct}
        />
      </td>
    </tr>
  );
}
