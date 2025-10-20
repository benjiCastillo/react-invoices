import { Button } from "primereact/button";
import { useProductsStore } from "../store/ProductsStore";
import { formatCurrency } from "../../../app/utils/formatCurrency";
import OrderRow from "./OrderList/OrderRow";

export default function OrderList() {
  const { getQuantity, getTotal, products } = useProductsStore();
  const quantity = getQuantity();
  const total = getTotal();

  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-bold hidden md:block">Pedido actual</h2>
        <table className="w-full">
          <tbody>
            {quantity === 0 ? (
              <tr>
                <td
                  colspan="5"
                  className="text-center py-4 text-gray-500 text-lg"
                >
                  No hay productos en la lista
                </td>
              </tr>
            ) : (
              products.map((product) => <OrderRow product={product} key={product.id} />)
            )}
          </tbody>
        </table>
      </div>
      <div className="sticky bottom-0 w-full bg-white py-4 border-t border-gray-300 z-[1] inset-shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-300 mb-2">
          <span className="text-xl font-bold">{quantity} items</span>
          <span className="text-xl font-bold">
            Total: {formatCurrency(total)} Bs.
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            severity="danger"
            size="large"
          />
          <Button
            label="Pagar"
            icon="pi pi-check"
            severity="primary"
            size="large"
          />
        </div>
      </div>
    </>
  );
}
