export const OLIVIA_ORDER_EVENT = 'cusi:order'

export function openOliviaOrder(product = '') {
  window.dispatchEvent(new CustomEvent(OLIVIA_ORDER_EVENT, { detail: { product } }))
}
