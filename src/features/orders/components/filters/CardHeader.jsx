import { useState } from "react";

export default function CardHeader({ dispatchPointSelected, value, onChange }) {
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

  const getTotals = () => {
    
  }

  return (
    <div className="flex flex-col md:flex-row justify-between bg-gray-100 p-2 rounded-lg gap-2">
      <div className="w-full sm:w-1/3 xl:w-1/2 order-1 md:order-2">
        {dispatchPointSelected && (
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold text-gray-800 text-left md:text-right">
            Comandas de {dispatchPointSelected?.name}
          </h3>
        )}
      </div>

      <div className="w-full sm:w-2/3 xl:w-1/2 order-2 md:order-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {deliveryTypes.map((option) => (
            <div
              key={option.id}
              className={`p-1 md:p-2 rounded-lg cursor-pointer ${
                value === option.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => {
                onChange(option.id);
              }}
            >
              <span className="font-bold text-xl xl:text-2xl block text-center">
                {option.total}
              </span>
              <span className="font-bold text-base xl:text-lg block text-center">
                {option.descripcion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
