# IndexNow

`public/81d6a71347c14e5b9f422d09b02d625b.txt` contains the public IndexNow ownership-verification key. It must be served at the same path on `https://gabri.me`. It is not an administrative credential and does not need a GitHub secret.

After a successful production deployment, `.github/workflows/ci.yml` runs the live end-to-end test. This invokes `scripts/indexnow.mjs` with the production build and the real IndexNow API. Pull requests, forks, and branch builds do not submit URLs.

The script checks `dist/client/81d6a71347c14e5b9f422d09b02d625b.txt`, reads `dist/client/sitemap.xml`, validates that every URL belongs to the production origin, and submits all unique URLs to `https://api.indexnow.org/indexnow` in batches of at most 10,000. It uses `fast-xml-parser` to read XML and decode escaped URLs. HTTP 200 means received; HTTP 202 means key validation is pending. Neither guarantees indexing. Missing build files, a mismatched key, an invalid sitemap, or rejected submissions fail the command and CI step. Only the IndexNow POST uses the network, with a 30-second timeout per request. IndexNow still fetches the public key URL to verify ownership.

This deliberately resubmits the whole sitemap on each production deployment. Deleted URLs are absent from the sitemap and are not submitted.

## Commands

```bash
# Submit from the production build after deploying that same build.
pnpm indexnow

# Run unit and integration tests without live submissions.
pnpm test:run

# Exercise the CLI with the production build and real IndexNow API.
# This submits URLs, so run it only when a submission is intended.
pnpm test:indexnow:live
```

The live test is skipped in ordinary test runs. CI runs it after deployment, capturing and checking the CLI output. Use Bing Webmaster Tools to inspect receipt and indexing status.

To rotate the key, replace the public file and update `key` in `scripts/indexnow.mjs`, then deploy before submitting.

## Local build inputs

Cloudflare Bot Fight Mode challenged the GitHub runner when it fetched the public sitemap, causing a 403 after a successful deployment. Submission reads the files from the deployed build instead of testing whether the runner can pass the site's bot protection. There are no live-site reads or fallback fetches, and no Cloudflare security settings need to change.

Manual runs require `pnpm build` and deployment of that same build first. CI already retains `dist/client` from its build step. Unit and integration tests use temporary files and mock only the IndexNow API. The opt-in end-to-end test uses the actual production build and real API without mocks.

## Verification during implementation

All 76 unit and integration tests passed, including XML parsing, URL validation, site-generator compatibility, disk-based key and sitemap reads, missing or invalid files, request payloads, batching, HTTP 200 and 202, and failures. Lint, type checks, formatting, and actionlint passed. The production build succeeded with a Vite chunk-size warning. The built verification file matched the key, and the built sitemap contained 16 URLs.

The real-API end-to-end test passed using the built production sitemap and submitted its 16 URLs. The test checks the CLI exit status, captured output, and absence of stderr. Ordinary test runs skip it to avoid unintended submissions.

Dependency installation reported deprecated transitive packages and Astro peer-version warnings for `@frontendista/astro-html-minify` and `astro-tweet`. Those packages were not changed for this task.

References: [Bing setup guide](https://www.bing.com/indexnow/getstarted), [IndexNow protocol](https://www.indexnow.org/documentation.html).
