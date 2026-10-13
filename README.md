# PDF Engine

A responsive, browser-based PDF utility website published with GitHub Pages.

## Live website

https://mureedabbas1.github.io/Easy-PDF/

## Tools currently included

### PDF tools
- Merge PDF
- Split PDF
- Rotate PDF
- Remove PDF pages
- Add page numbers
- PDF to JPG
- JPG to PDF
- Compress PDF (rasterizes pages, so text may no longer be selectable)
- Extract PDF pages
- Reorder PDF pages
- Add a text watermark
- Crop PDF pages (visual crop only; not secure redaction)
- Extract selectable text from PDF (scanned image-only pages need OCR)
- Sign PDF with a visible typed signature (not a verified digital signature)
- Add text to PDF pages
- Flatten supported interactive PDF form fields

### Text and calculators
- Word Counter
- Case Converter
- Percentage Calculator
- Age Calculator

Total: 20 tools (17 existing tools plus these 3 additions).

## SEO files

- `sitemap.xml` lists the homepage and individual tool landing pages.
- `robots.txt` allows crawling and points crawlers to the sitemap.
- Tool landing pages have unique titles, descriptions, canonical URLs, and structured WebPage metadata.

## Privacy and limitations

The available PDF workflows process selected files in the browser; this repository does not provide a PDF upload server. Third-party CDN scripts and Google Fonts are loaded when the site is used, so the privacy policy should be reviewed to accurately describe those external requests.

PDF compression converts pages to images and can reduce text searchability. Cropping changes the visible page area but does not securely erase hidden content. The watermark is a visible text label, not a security control. PDF-to-text extracts existing text and does not perform OCR.

## Contact

Report issues or request features at:
https://github.com/Mureedabbas1/Easy-PDF/issues

Do not post private documents, passwords, or sensitive personal information in public issues.

## Deployment

GitHub Pages uses the `main` branch root. After commits, allow the Pages deployment workflow to finish before checking the live site.

## License

No license is currently specified. Add a license before inviting reuse or external contributions.
