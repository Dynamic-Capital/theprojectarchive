# Static Site Configuration Tasks

- [ ] Update `.do/app.yaml` with a `static_site` entry:
  - `source_dir: .`
  - `output_dir: _static`
  - `index_document: index.html`
- [ ] Ensure the Next.js export script generates `/_static/index.html`.
- [ ] Verify build and deployment environments recognize the updated paths.
- [ ] Document the configuration in project documentation or UI.
- [ ] Test deployment using the new static site settings.
