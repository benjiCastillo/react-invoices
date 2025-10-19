import { useEffect, useState } from "react";
import { OrdersServices } from "../services/orders.services";
import CardOrder from "./CardOrder/CardOrder";    

export default function ListOrders() {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    column: "id",
    delivered: false,
    dispatch_point_id: 2,
    company_id: 38,
  });

  const getorders = async () => {
    setLoading(true);
    try {
      const res = await OrdersServices.getComandas(filters);

      setorders(
        res.data.map((sale) => {
          const allDelivered =
            sale.sale_items?.length > 0
              ? sale.sale_items.every((item) => item.delivered)
              : false;
          return {
            ...sale,
            visible: !allDelivered, // solo visible si no están todos entregados
          };
        })
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getorders();
  }, []);

  return (
    <div>
      <h1>Lista de ordenes</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <section className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex-1 overflow-y-auto">
            <div className="relative">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
                    {orders.filter((s) => s.visible).map((order) => (
                        <CardOrder
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
      )}
    </div>
  );
}
