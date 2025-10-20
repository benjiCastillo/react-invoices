import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { ProductsServices } from "../services/products.service";
import { useAuthStore } from "../../../app/store/UseAuthStore";
import ProductCard from "./ProductsList/ProductCard";

export default function ProductsList() {
  const { currentBranchOfficeId, currentCompanyId } = useAuthStore();
  console.log(currentBranchOfficeId(), currentCompanyId());
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    column: "position",
    asc: true,
    code_number: "",
    name: "",
    sin_name: "",
    sin_code: "",
    enabled: null,
    activity_id: null,
    company_id: currentCompanyId(), // lo llenamos al montar
    measurement_unit_id: null,
    category_id: null,
  });

  const [dataTable, setDataTable] = useState({
    total: 0,
    last_page: 0,
    loading: false,
  });

  const getProducts = async () => {
    setDataTable({ ...dataTable, loading: true });
    const response = await ProductsServices.indexPOS(filters);
    console.log(response);
    setProducts(response.data.data);
    setDataTable({
      ...dataTable,
      total: response.data.total,
      last_page: response.data.last_page,
    });
    setDataTable({ ...dataTable, loading: false });
  };

  useEffect(() => {
    getProducts();
  }, [filters]);

  return (
    <section className="w-full">
      <div className="flex gap-4 px-2 py-1">
        <InputText />
      </div>
      {/* categories buttons */}
      <div className="flex justify-center gap-4 px-2 py-1"></div>

      {/* products */}
      <div className="overflow-y-auto h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
