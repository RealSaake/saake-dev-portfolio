# OG faces

Satori — the renderer behind `next/og` — cannot read woff2 and cannot
resolve a variable font axis. The four woff2 files in `public/fonts/`
that the site itself uses are therefore unusable for share cards, so
these three static TTFs exist alongside them.

They are a build-time dependency only. Nothing here is served to a
browser; the only artefact that reaches a user is the 1200×630 PNG.

| File | Face | Source |
| --- | --- | --- |
| `InstrumentSerif-Regular.ttf` | Instrument Serif 400 | Google Fonts, `instrumentserif/v5` |
| `Geist-Regular.ttf` | Geist 400 (static instance) | Google Fonts, `geist/v5` |
| `GeistMono-Regular.ttf` | Geist Mono 400 (static instance) | Google Fonts, `geistmono/v6` |

All three are OFL 1.1.

Google Fonts serves woff2 to a modern user agent and TTF only to one it
believes is old, so re-fetching means asking for the TTF explicitly:

```bash
UA="Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
curl -s -H "User-Agent: $UA" "https://fonts.googleapis.com/css2?family=Instrument+Serif" | grep -o 'https://fonts.gstatic.com[^)]*'
```

Check the first four bytes of anything you download: `00010000` is a
real TrueType file. The legacy-IE user agent returns an EOT instead,
which is the wrong format and fails at render time rather than at
download time.
