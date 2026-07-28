# MILDA Web App — Structured Prototype

A dependency-free, clickable web prototype for **MILDA: Media and Information Literacy in the Digital Age**.

## Project structure

```text
MILDA_Web_App_Structured/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        ├── icons.js
        ├── constants.js
        ├── data.js
        ├── state.js
        ├── utils.js
        ├── renderers.js
        └── app.js
```

## File responsibilities

- `index.html` — semantic page markup only.
- `styles.css` — complete responsive visual system.
- `icons.js` — reusable SVG sprite and injection.
- `constants.js` — labels, roles, view names, statuses, demo values, and timing.
- `data.js` — course modules, community records, and verification scenarios.
- `state.js` — mutable runtime state cloned from the source data.
- `utils.js` — DOM helpers, HTML escaping, capitalization, and toast messages.
- `renderers.js` — reusable module, community, and progress renderers.
- `app.js` — navigation, event binding, role previews, lessons, verification, drawers, and modals.

## Run

Open `index.html` in a current browser.

No build command, package manager, backend, or local server is required.

## Font

The app uses **Plus Jakarta Sans Variable** through Google Fonts. When offline, the system-font fallback is used.

## Prototype limitations

This front-end demonstration still uses sample data and does not include:

- Authentication
- Database persistence
- Actual AI API requests
- Real file uploads
- Production moderation
- Production privacy and security controls

## Suggested production architecture

- Laravel backend/API
- React or Blade frontend
- MySQL database
- Role-based authentication
- Queue-based AI processing
- Moderation and audit logging
- Secure object storage
