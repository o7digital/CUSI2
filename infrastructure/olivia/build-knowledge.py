"""Snapshot the public CUSI catalog; reviewed snapshots are committed before rollout."""
import json
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent
with urllib.request.urlopen('https://www.cusiflores.com/api/products', timeout=30) as response:
    products = json.load(response)['products']
assert len(products) >= 20, 'The public catalog must be available before deployment'
docs = [
    {'title': 'CUSI Flores — services and contact', 'source': 'https://www.cusiflores.com/',
     'content': 'CUSI Flores is a premium floral studio in Ciudad de México. It offers bouquets, roses, tulips, Phalaenopsis orchids, floral arrangements, personalized gifts and event floral design. Orders and quotes: WhatsApp +52 55 2109 2665, https://wa.me/525521092665. Each order is confirmed by CUSI for flower availability, presentation, price, destination, date and schedule. Instagram: https://instagram.com/cusiflores.', 'metadata': {}},
    {'title': 'Delivery and ordering', 'source': 'https://www.cusiflores.com/flores-a-domicilio-cdmx',
     'content': 'CUSI coordinates scheduled flower delivery in selected areas of Ciudad de México and its metropolitan area. Frequent areas include Lomas de Chapultepec, Bosques de las Lomas, Polanco, Santa Fe, Roma and Condesa. Ask CUSI to confirm destination coverage, the final delivery cost and the available delivery window. Same-day service depends on availability and must be confirmed with CUSI. Automatic road-distance pricing is not active on the public site. No chat action can confirm an order or accept payment.', 'metadata': {}},
    {'title': 'Published flower catalog', 'source': 'https://www.cusiflores.com/#coleccion',
     'content': 'Published CUSI catalog reference prices in MXN. These are product prices, not a confirmed checkout total; confirm availability, tax and delivery with CUSI before payment.\n' + '\n'.join(f"{p['title']}: {p['price']} MXN. {p.get('desc', '')}" for p in products), 'metadata': {'product_count': len(products)}},
]
(root / 'knowledge/documents.json').write_text(json.dumps(docs, ensure_ascii=False, indent=2) + '\n')
print(f'Prepared {len(docs)} CUSI documents with {len(products)} catalog products')
