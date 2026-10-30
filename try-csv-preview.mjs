// Run with Node.js 22+: node try-csv-preview.mjs
// Sends only this synthetic example to the free preview. No wallet or API key.
import assert from 'node:assert/strict';

const endpoint = 'https://automaton-storefront.9r52yt2gg5.workers.dev/api/preview';
const input = {
  csv: 'product_id;name\n00127;  Sample widget  \n00127;  Sample widget  \n00905;=1+1',
  delimiter: 'auto',
  deduplicate: true,
};

const response = await fetch(endpoint, {
  method: 'POST',
  redirect: 'error',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(input),
  signal: AbortSignal.timeout(15000),
});
if (response.status !== 200) {
  throw new Error(`Free preview returned HTTP ${response.status}; no payment will be attempted.`);
}
const result = await response.json();
assert.equal(result.preview, true);
assert.deepEqual(result.records, [
  { product_id: '00127', name: 'Sample widget' },
  { product_id: '00905', name: '=1+1' },
]);
assert.equal(result.report.inputRows, 3);
assert.equal(result.report.outputRows, 2);
assert.equal(result.report.duplicateRowsRemoved, 1);
assert.equal(result.csv, "product_id;name\r\n00127;Sample widget\r\n00905;'=1+1\r\n");
console.log('Free preview verified: identifiers preserved, whitespace trimmed, duplicate removed, CSV formula protected.');
console.log(JSON.stringify({ records: result.records, report: result.report, csv: result.csv }, null, 2));
