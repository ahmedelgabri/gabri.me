# IndexNow

`public/81d6a71347c14e5b9f422d09b02d625b.txt` contains the public IndexNow ownership-verification key. It must be served at the same path on `https://gabri.me`. It is not an administrative credential and does not need a GitHub secret.

After a successful production deployment, `.github/workflows/ci.yml` runs the live end-to-end test. This invokes `scripts/indexnow.mjs` against the real site and IndexNow API. Pull requests, forks, and branch builds do not submit URLs.

The script checks the deployed key, fetches `https://gabri.me/sitemap.xml`, validates that every URL belongs to the production origin, and submits all unique URLs to `https://api.indexnow.org/indexnow` in batches of at most 10,000. It uses `fast-xml-parser` to read XML and decode escaped URLs. HTTP 200 means received; HTTP 202 means key validation is pending. Neither guarantees indexing. Fetch failures, a mismatched key, an invalid sitemap, or rejected submissions fail the command and CI step. Each request has a 30-second timeout.

This deliberately resubmits the whole sitemap on each production deployment. Deleted URLs are absent from the sitemap and are not submitted.

## Commands

```bash
# Submit manually after the verification file is live.
pnpm indexnow

# Run unit and integration tests without live submissions.
pnpm test:run

# Exercise the CLI against the production site and real IndexNow API.
# This submits URLs, so run it only when a submission is intended.
pnpm test:indexnow:live
```

The live test is skipped in ordinary test runs. CI runs it after deployment, capturing and checking the CLI output. Use Bing Webmaster Tools to inspect receipt and indexing status.

To rotate the key, replace the public file and update `key` in `scripts/indexnow.mjs`, then deploy before submitting.

## Verification during implementation

All 77 unit and integration tests passed, including XML parsing, URL validation, site-generator compatibility, the key file, request payloads, batching, HTTP 200 and 202, and failures. Lint, type checks, formatting, and actionlint passed. The production build succeeded with a Vite chunk-size warning. The built verification file matched the key, and the built sitemap contained 16 URLs.

A live CLI check confirmed that submission stops with an error while the production key URL returns HTTP 404. Its exit code and captured output were checked. The live submission success test remains pending until deployment; ordinary test runs skip it to avoid unintended submissions.

Dependency installation reported deprecated transitive packages and Astro peer-version warnings for `@frontendista/astro-html-minify` and `astro-tweet`. Those packages were not changed for this task.

References: [Bing setup guide](https://www.bing.com/indexnow/getstarted), [IndexNow protocol](https://www.indexnow.org/documentation.html).
