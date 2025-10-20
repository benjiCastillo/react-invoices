import { useSaleStore } from "../store/SaleStore";

import ProductsList from "../components/ProductsList";
import OrderList from "../components/OrderList";

export default function PosPage() {

  const getException = useSaleStore((state) => state.getException);
 
  return (
    <section className="grid grid-cols-12 gap-6 p-4">
      <div className="col-span-12 md:col-span-7 border-r-0 md:border-r-1 border-gray-200">
        <ProductsList />
      </div>
      <div className="col-span-12 md:col-span-5 hidden md:block">
        <OrderList />
      </div>
    </section>
  );
}
