export function clearObj(q) {
  const data = { ...q };
  for (const prop in data) {
    if (data[prop] === null || data[prop] === "") {
      delete data[prop];
    }
  }
  return data;
}
