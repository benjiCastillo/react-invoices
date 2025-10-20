import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { useProductsStore } from "../../store/ProductsStore";

export default function ProductCard({ product }) {
  const { setProducts } = useProductsStore();

  const addProduct = (product) => {
    if (product.price <= 0) {
      console.log("El precio debe ser mayor a 0");
      return;
    }

    const productStore = {
      ...product,
      additional_data: {
        note: "",
        dispatch_point_id: product.dispatch_point_id,
      },
    };
    setProducts(productStore);
  };

  return (
    <div>
      <div
        className="group relative bg-gray-200 rounded-lg shadow-md overflow-hidden p-2 hover:cursor-pointer hidden md:block"
        onClick={() => addProduct(product)}
      >
        <img
          src={product.img_url || imgProductDefault}
          alt={product.name}
          className="aspect-square object-cover w-full rounded-lg shadow-md"
        />
        <div className="mt-2">
          <h3 className="font-semibold text-gray-800">
            <a href={product.href} className="hover:underline">
              {product.name}
            </a>
          </h3>
          <p className="font-bold text-gray-900 mt-2 text-right">
            Bs. {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      {/* <!-- Mobile --> */}
      <div
        className="group relative bg-gray-200 rounded-lg shadow-md overflow-hidden p-2 hover:cursor-pointer h-24 md:h-auto flex md:hidden"
        onClick={() => addProduct(product)}
      >
        {/* <!-- Imagen --> */}
        <img
          src={product.img_url || imgProductDefault}
          alt={product.name}
          className="object-cover rounded-lg shadow-md w-1/4 h-full md:w-full md:aspect-square"
        />

        {/* <!-- Texto --> */}
        <div className="ml-2 flex flex-col justify-between flex-1 md:ml-0 md:mt-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2 text-lg">
            <a href={product.href} className="hover:underline">
              {product.name}
            </a>
          </h3>
          <p className="font-bold text-gray-900 text-right text-lg">
            Bs. {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
