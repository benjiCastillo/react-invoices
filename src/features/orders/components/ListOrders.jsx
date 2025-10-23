import { useEffect, useState } from "react";
import { OrdersServices } from "../services/orders.services";
import CardOrder from "./CardOrder/CardOrder";
import FiltersOrders from "./FiltersOrders";
import { useAuthStore } from "../../../app/store/UseAuthStore";

export default function ListOrders() {
  const { currentCompanyId } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    column: "id",
    delivered: false,
    dispatch_point_id: 2,
    company_id: currentCompanyId(),
    invoice_document_number: "",
  });

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await OrdersServices.getComandas(filters);
      console.log(res.data);
      setOrders(
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
    getOrders();
  }, []);

  const handleFiltersChange = (newFilters) => {
    console.log(newFilters);
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <section className="w-full">
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      {/* search */}
      <FiltersOrders
        filters={filters}
        onChange={handleFiltersChange}
        onSearch={getOrders}
      />
      <div>
        {loading ? (
          <section className="flex items-center justify-center h-[calc(40vh)]">
            <p>Cargando...</p>
          </section>
        ) : (
          <section className="flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {orders.length > 0 ? (
                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
                    {orders
                      .filter((s) => s.visible)
                      .map((order) => (
                        <CardOrder key={order.id} order={order} />
                      ))}
                  </div>
                </div>
              ) : (
                <section className="flex items-center justify-center h-[calc(40vh)]">
                  <p>No se encontraron registros</p>
                </section>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
