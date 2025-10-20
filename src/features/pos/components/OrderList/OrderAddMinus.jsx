import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useProductsStore } from "../../../pos/store/ProductsStore";

export default function OrderAddMinus({ product }) {
  const { updateProductQuantity } = useProductsStore();
  const [quantity, setQuantity] = useState(product.quantity ?? 1);

  useEffect(() => {
    setQuantity(product.quantity ?? 1);
  }, [product.quantity]);

  const handleMinus = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateProductQuantity(product.id, newQuantity);
    }
  };

  const handlePlus = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateProductQuantity(product.id, newQuantity);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setQuantity(parsed);
    }
  };

  const handleBlur = () => {
    const validValue = quantity === "" ? 1 : quantity;
    setQuantity(validValue);
    updateProductQuantity(product.id, validValue);
  };

  return (
    <div className="flex items-center">
      <Button
        icon="pi pi-minus"
        severity="secondary"
        size="small"
        rounded
        onClick={handleMinus}
      />
      <input
        type="number"
        className="w-24 border-1 border-gray-300 rounded-lg py-1 px-2 mx-1 text-center text-lg"
        min="1"
        max="99999"
        step="1"
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
      />
      <Button
        icon="pi pi-plus"
        severity="secondary"
        size="small"
        rounded
        onClick={handlePlus}
      />
    </div>
  );
}
