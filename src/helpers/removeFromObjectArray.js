export default function removeFromObjectArray(array, key, value) {
  const copy = [...array];
  const index = array.findIndex(obj => obj[key] === value);
  copy.splice(index, 1);
  return copy;
}