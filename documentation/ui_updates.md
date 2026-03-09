# UI Updates & Yearly Styling

This guide explains how to update the website's content and appearance for the current year.

## 📅 Updating the Schedule

The schedule is hardcoded in the frontend for performance and simplicity.

- **File:** `client/src/features/live-site/components/schedule.tsx`
- **Action:** Update the `scheduleData`, `cyberData`, `makerspaceData`, and `transportData` arrays with the new event details.
- **Format:**
  ```typescript
  createData(
    "Event Name",
    "Location",
    "Details/Link",
    "Month Day",
    "Start Time",
    "End Time",
  );
  ```

## 🎨 Yearly Styling (CSS)

Each year, MakeUC has a new theme and color palette. We manage this by creating a new global CSS file.

### 1. Create a new CSS file

1.  Navigate to `client/src/app/`.
2.  Duplicate the previous year's CSS file (e.g., `makeuc-2025.css`) and rename it for the current year (e.g., `makeuc-2026.css`).
3.  Update the CSS variables (colors, fonts, backgrounds) in the new file to match the new branding.

### 2. Update the import

1.  Open `client/src/app/layout.tsx`.
2.  Change the import statement to point to the new CSS file:
    ```typescript
    import "./makeuc-2026.css"; // UPDATE THIS
    ```

### 3. Update Fonts & Assets

- **Fonts:** New fonts should be added to `client/public/assets/fonts/` and defined in your CSS.
- **Images:** Update logos and background graphics in `client/src/assets/` or `client/public/assets/`.

## ✏️ Landing Page Content

General text updates (dates, taglines, sponsors) are primarily found in:

- `client/src/app/page.tsx`
- `client/src/app/about/page.tsx`
- `client/src/features/sponsors/` (for logo updates)
