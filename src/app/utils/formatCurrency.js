export function formatCurrency(number) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(parseFloat(number)).replace(/\$/g, "");
}
