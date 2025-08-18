# The Project Archive

This repository contains the marketing site for The Project Archive, a creative studio based in the Maldives. The site now features individual pages for each key section—About, Mission, Approach, In Numbers, Services, and Contact—linked from a global navigation bar. The Services page also showcases a small photo gallery of past projects.

Open `index.html` in a browser to view the home page.

## Replacing Gallery Images

The Services page displays sample photos sourced from Unsplash. To showcase your own work instead:

1. Add your images to `assets/gallery/` (create the folder if it does not exist).
2. Update the `<img>` tags in `services.html` so each `src` points to your files, e.g. `assets/gallery/my-photo.jpg`.
3. Provide meaningful `alt` text for accessibility.
4. Use images around 400×300 pixels to match the existing layout.

## Inquiry Form Backend Setup

To handle visitor inquiries you will need a backend service—this repository only contains the front‑end:

1. Choose a service such as Formspree, Netlify Forms or a custom Node/Express API.
2. Configure the service to accept `POST` requests and deliver notifications or store messages.
3. Expose the form endpoint via an environment variable (e.g. `FORM_ENDPOINT`) in a local `.env` file and point the `<form>` in `contact.html` to that URL.
4. When deploying, configure the same environment variable in your hosting platform and keep `.env` out of version control.

## AI Chat Bot Configuration and Deployment

An optional AI chat bot can assist visitors with common questions. To enable it:

1. Implement a backend route (for example `/api/chat`) that forwards chat prompts to your AI provider.
2. Store the provider’s API key in an environment variable such as `OPENAI_API_KEY`. Never embed API keys directly in client‑side JavaScript or commit them to the repository.
3. During local development, place keys in a `.env` file that is ignored by Git. When deploying, set the same variables in your hosting environment.
4. Update your front‑end script to send chat requests to the backend route and render the responses.
5. Deploy the site along with the backend service; ensure the service has access to the required environment variables in production.
