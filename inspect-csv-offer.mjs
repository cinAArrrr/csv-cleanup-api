// Node.js 22+: node inspect-csv-offer.mjs
// Inspect an unsigned x402 offer using synthetic data. Never signs or pays.
import assert from 'node:assert/strict';

const endpoint = 'https://automaton-storefront.9r52yt2gg5.workers.dev/api/clean';
const response = await fetch(endpoint, {
  method: 'POST',
  redirect: 'error',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ csv: 'id,name\n001,Ada' }),
  signal: AbortSignal.timeout(15000),
});
assert.equal(response.status, 402, 'Expected an unsigned payment challenge; inspect changes manually.');
const encoded = response.headers.get('payment-required');
assert.ok(encoded, 'Missing PAYMENT-REQUIRED header.');
const offer = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
assert.equal(offer.x402Version, 2);
assert.equal(offer.accepts?.length, 1, 'Offer options changed; inspect manually.');
const payment = offer.accepts[0];
assert.equal(payment.scheme, 'exact');
assert.equal(payment.network, 'eip155:8453');
assert.equal(payment.amount, '2000');
assert.equal(payment.asset?.toLowerCase(), '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913');
assert.equal(payment.payTo?.toLowerCase(), '0x0b8a1f95f0e987f35277bc29476e8d8be3e3b884');
console.log('Expected x402 v2 offer verified. No payment was signed or sent.');
console.log(JSON.stringify({
  scheme: payment.scheme, network: payment.network,
  amountInAtomicUnits: payment.amount, asset: payment.asset,
  payTo: payment.payTo, maxTimeoutSeconds: payment.maxTimeoutSeconds,
}, null, 2));
