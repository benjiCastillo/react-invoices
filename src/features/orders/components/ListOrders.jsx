import { useEffect, useState } from "react";
import CardOrder from "./CardOrder/CardOrder";
import FiltersOrders from "./filters/FiltersOrders";

import { useAuthStore } from "../../../app/store/UseAuthStore";

import { OrdersServices } from "../services/orders.services";

export default function ListOrders() {
  const { currentCompanyId } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    column: "id",
    delivered: false,
    dispatch_point_id: null,
    company_id: currentCompanyId(),
    invoice_document_number: "",
    delivery_type: null,
  });

  const [searchTrigger, setSearchTrigger] = useState(0);

  const getOrders = async () => {
    if (filters.dispatch_point_id === null) {
      return;
    }

    setLoading(true);
    try {
      const res = await OrdersServices.getComandas(filters);
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

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const triggerSearch = () => setSearchTrigger((v) => v + 1);

  // totals
  const [deliveryTypes, setDeliveryTypes] = useState([
    {
      id: null,
      descripcion: "TODOS",
      total: 0,
    },
    {
      id: "DINE-IN",
      descripcion: "PARA LA MESA",
      total: 0,
    },
    {
      id: "TAKEAWAY",
      descripcion: "PARA LLEVAR",
      total: 0,
    },
    {
      id: "DELIVERY",
      descripcion: "DELIVERY",
      total: 0,
    },
  ]);
  
  const getTotals = async () => {
    try {
      if (!filters?.dispatch_point_id) return;

      const res = await OrdersServices.getTotals(filters);
      const totals = res.data.data;

      const totalsMap = totals.reduce((acc, t) => {
        acc[t.delivery_type] = t.total;
        return acc;
      }, {});

      const totalTodos = totals.reduce((acc, t) => acc + t.total, 0);

      setDeliveryTypes((prev) =>
        prev.map((item) => ({
          ...item,
          total: item.id === null ? totalTodos : totalsMap[item.id] || 0,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    getTotals();
  }, [searchTrigger]);

  return (
    <section className="w-full">
      {/* search */}
      <FiltersOrders
        filters={filters}
        loading={loading}
        onChange={handleFiltersChange}
        onSearch={getOrders}
        onTrigger={triggerSearch}

        deliveryTypes={deliveryTypes}
        
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
                        <CardOrder
                          key={order.id}
                          order={order}
                          delivered={triggerSearch}

                          successOrder={triggerSearch}
                        />
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
