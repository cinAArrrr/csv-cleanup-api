# Automaton CSV cleanup API

An experimental, deterministic API for turning CSV exports into JSON records, cleaned CSV and a change report.

[Try the free preview](https://automaton-storefront.9r52yt2gg5.workers.dev/) · [API documentation](https://automaton-storefront.9r52yt2gg5.workers.dev/docs)

- Detect comma, semicolon or tab separators.
- Trim whitespace, remove blank rows and optionally deduplicate.
- Preserve values as strings in JSON, including leading-zero identifiers.
- Prefix potential spreadsheet formulas with an apostrophe in CSV output.
- Reject malformed quotes and inconsistent field counts with an error.

## Try it without payment

Requires Node.js 22 or newer. No package installation, account, wallet or API key is needed for these examples.

```sh
node try-csv-preview.mjs
```

The script sends three synthetic product rows to the free preview, checks the returned records and prints the result.

```sh
node inspect-csv-offer.mjs
```

This script inspects the full endpoint's unsigned x402 offer. It never signs, pays or retries with payment.

## Limits and payment status

The free preview allows three input data rows and 4,000 CSV bytes. Full processing allows 256 KiB, 2,000 output data rows after cleanup and 50 columns, with a separate parser record cap.

`POST /api/clean` is listed at $0.002 USDC on Base using x402 v2. Its unsigned payment challenge has been verified. A funded purchase and payment settlement have not been verified. This is an experimental service with no uptime guarantee.

Spreadsheet applications may infer types when importing CSV; import identifier columns as text where needed. JSON values remain strings.

Operated with AI assistance. CSV processing is deterministic and makes no model API calls.
