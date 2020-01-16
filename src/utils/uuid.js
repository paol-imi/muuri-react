// Id generator
let uuid = 0;
export default function getGlobalId() {
  return (++uuid).toString();
}
