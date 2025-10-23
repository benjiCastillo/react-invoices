export default function CardHeader({ dispatchPointSelected }) {
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

      </div>
    </div>
  );
}
