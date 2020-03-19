export function getTemporaryGrid() {
  const el = document.createElement("div");
  el.style.display = "mone";
  el.visibility = "hidden";

  document.body.appendChild(el);

  return [el, () => document.body.removeChild(el)];
}
