import test from 'node:test'
import assert from 'node:assert/strict'
import { formatWooPrice, getPurchaseUrl } from '../lib/woocommerce.ts'

const base = 'https://wp-cusi.o7digitalgroup.com/dev'
const bouquet = { id: 71, type: 'simple', is_purchasable: true, is_in_stock: true,
  prices: { price: '462840', currency_code: 'MXN', currency_minor_unit: 2 } }

test('formats the authoritative price including IVA without taxing it twice', () => {
  assert.deepEqual(formatWooPrice(bouquet.prices), { price: '$4,628.40', priceAmount: '4628.40', currency: 'MXN' })
})
test('checkout contains exactly the selected product and quantity, under the test shop', () => {
  assert.equal(getPurchaseUrl(bouquet, base), `${base}/checkout/?add-to-cart=71&quantity=1`)
})
test('unavailable or unpriced bouquets do not offer a payment link', () => {
  for (const changes of [{ is_in_stock: false }, { is_purchasable: false }, { prices: undefined }, { prices: { price: 'invalid' } }, { prices: { price: '0' } }]) {
    assert.equal(getPurchaseUrl({ ...bouquet, ...changes }, base), undefined)
  }
})
test('variable bouquets open the product to select options', () => {
  const permalink = `${base}/product/rosas/`
  assert.equal(getPurchaseUrl({ ...bouquet, type: 'variable', has_options: true, permalink }, base), permalink)
  assert.equal(getPurchaseUrl({ ...bouquet, type: 'variable', permalink: 'https://other.example/product/rosas/' }, base), undefined)
  assert.equal(getPurchaseUrl({ ...bouquet, type: 'variable', permalink: 'javascript:alert(1)' }, base), undefined)
  assert.equal(getPurchaseUrl({ ...bouquet, type: 'variable', permalink: 'https://wp-cusi.o7digitalgroup.com/product/live/' }, base), undefined)
})
test('missing and malformed prices do not create a numeric offer', () => {
  for (const prices of [undefined, { price: '' }, { price: 'NaN' }, { price: '-1' }, { price: '1', currency_minor_unit: -1 }]) {
    assert.equal(formatWooPrice(prices).priceAmount, undefined)
  }
  assert.equal(formatWooPrice({ price: '1000', currency_code: 'JPY', currency_minor_unit: 0 }).priceAmount, '1000')
})
