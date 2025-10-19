import ListOrders from "../components/ListOrders";

export default function ListOrdersPage() {
  return (
    <section className="grid grid-cols-12 gap-6 p-4">
      <div className="col-span-12 md:col-span-12">
        <ListOrders />
      </div>
    </section>
  );
}
