# MakeUC Website: Client

This folder contains the Next.js frontend for the MakeUC website.

## Registration Enable/Disable Practice

To enable or disable registration, you must comment or uncomment the registration route in `src/app/registration/page.tsx`.

- **To disable registration:** Comment out the export or main component in [`src/app/registration/page.tsx`](../src/app/registration/page.tsx).
- **To enable registration:** Uncomment the export or main component in the same file.

This will control whether the registration page is accessible to users.

## Styling and Theming

- The main site theme colors are defined in [`src/app/globals.css`](../src/app/globals.css). **Do not add anything else to this file except for the yearly rebrand colors.**
- For each new hackathon year, create a new CSS file (e.g., `makeuc-2025.css`) and import it in `globals.css`. Do not delete previous years' CSS files; keep them for future reference.

## Hero SVG Recoloring

To recolor the hero SVG (`header.svg`), you must edit the SVG file directly. You can find it at [`src/assets/header.svg`](../src/assets/header.svg). Open this file as text and modify the color values as needed.

---

For more details on the frontend stack and standards, see the [main README](../README.md).
