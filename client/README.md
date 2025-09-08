# MakeUC Website: Client

This folder contains the Next.js frontend for the MakeUC website.

## Registration and MLH Banner Feature Flags
You can enable or disable the registration form and the MLH banner using a centralized constants file.

To enable or disable these features, change the boolean value in src/constants/Config.ts:

**To show registration:** Set ShowRegistration: true.

**To hide registration:** Set ShowRegistration: false.

**To show the MLH banner:** Set ShowMLHBanner: true.

**To hide the MLH banner:** Set ShowMLHBanner: false.

These flags control the visibility of the components across the site, including the registration page itself and the navigation links.



## Styling and Theming

- The main site theme colors are defined in [`src/app/globals.css`](../src/app/globals.css). **Do not add anything else to this file except for the yearly rebrand colors.**
- For each new hackathon year, create a new CSS file (e.g., `makeuc-2025.css`) and import it in `globals.css`. Do not delete previous years' CSS files; keep them for future reference.

## Hero SVG Recoloring

To recolor the hero SVG (`header.svg`), you must edit the SVG file directly. You can find it at [`src/assets/header.svg`](../src/assets/header.svg). Open this file as text and modify the color values as needed.

---

For more details on the frontend stack and standards, see the [main README](../README.md).
