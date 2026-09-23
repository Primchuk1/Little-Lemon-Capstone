# Little Lemon Capstone

A responsive restaurant website built for the Coursera front-end capstone project. Little Lemon is a fictional, family-owned Mediterranean restaurant in Chicago. Visitors can explore the restaurant and menu, reserve a table, and review their booking details.

## Features

- A homepage with food photography, featured dishes, and clearly labeled sample testimonials.
- Static About, Menu, and Order Online pages with a shared header, footer, and consistent branding.
- A reservation form collecting name, email, phone number, date, time, guest count, and occasion.
- Client-side validation with inline error messages, accessible field descriptions, and focus on the first invalid field.
- Date-based availability that excludes previously reserved slots during navigation within the app.
- A confirmation page displaying each reservation and its contact details.
- Responsive layouts, keyboard focus indicators, descriptive image text, and locally stored images and logos.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React 19 | Components, form state, and shared reservation state using hooks |
| React Router 7 | Client-side routing and navigation |
| JavaScript / JSX | Application logic and component markup |
| CSS | Custom styling, CSS variables, Grid, Flexbox, and responsive breakpoints |
| Vite 8 | Development server and production builds |
| Vitest 5 | Automated tests |
| React Testing Library, jest-dom, and jsdom | Component interaction tests and DOM assertions |
| Oxlint | JavaScript and React linting |
| npm | Dependency management and project scripts |

This project does not use a CSS framework, backend server, or database.

## Getting started

Use Node.js **22.22.2+ within the 22.x release line**, **24.15.0+ within 24.x**, or **26+**, with npm. These versions satisfy the installed build and test dependencies.

From the repository's outer folder, enter the application directory:

```sh
cd little-lemon-capstone
```

If your terminal is already in the directory containing this README and `package.json`, skip that step.

Install dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. No environment variables or API keys are required.

## Available commands

Run these commands from the application directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally after building |
| `npm run test` | Run Vitest in watch mode during local development |
| `npm run test -- --run` | Run the test suite once |
| `npm run lint` | Run Oxlint |

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Homepage with featured dishes and sample testimonials |
| `/about` | Restaurant story, values, and location |
| `/menu` | Categorized dishes, descriptions, and prices |
| `/order-online` | Static ordering preview with a coming-soon notice |
| `/reservations` | Table reservation form |
| `/booking-confirmation` | Reservation and contact details |

## Reservation flow

1. Enter contact details and choose a date.
2. Select a time from the date's simulated availability, then choose the number of guests and occasion.
3. Submit the form. Invalid fields display errors and prevent submission.
4. A valid booking is added to shared state, and the app navigates to the confirmation page.
5. Return to the form through the site's navigation. The previously booked time is unavailable on that date.

`App.jsx` holds the reservation state with `useReducer`. Its local `fetchAPI` function generates a repeatable set of times for each date; `submitAPI` simulates a successful booking. React Router links preserve this state while moving between pages.

Validation is shared between the form and submission handler through `src/bookingValidation.js`:

| Field | Rules |
| --- | --- |
| Name | Required, contains a letter, up to 100 characters after trimming |
| Email | Required, basic email format, up to 254 characters |
| Phone number | Required, 7–15 digits; permits spaces, parentheses, periods, hyphens, and a leading `+` |
| Date | Valid calendar date, today or later |
| Time | Must be available for the selected date and in the future |
| Guests | Whole number from 1 to 10 |
| Occasion | Birthday or Anniversary |

Contact details are trimmed before saving. Changing the date clears the selected time. Booked date-and-time combinations cannot be submitted again in the same app session.

## Project structure

```text
little-lemon-capstone/
|-- public/
|   `-- images/                 # Food photos, logos, and asset credits
|-- src/
|   |-- Components/            # Shared layout, booking form, and homepage sections
|   |-- Pages/                 # Route-level pages
|   |-- Tests/
|   |   `-- BookingForm.test.jsx
|   |-- assets/                # Original SVG asset
|   |-- data/menu.js           # Static menu content
|   |-- App.jsx                # Routes, mock API functions, and booking reducer
|   |-- App.css                # Component and page styling
|   |-- bookingValidation.js   # Shared reservation validation
|   |-- index.css              # Base typography and global styles
|   |-- main.jsx               # React entry point and BrowserRouter
|   `-- setupTests.js          # jest-dom test setup
|-- index.html
|-- package.json
`-- vite.config.js             # Vite and Vitest configuration
```

## Testing

The booking tests cover required fields, invalid contact information, guest limits, date and time validation, error recovery, unavailable slots, duplicate prevention, and reservation persistence across internal navigation. They also verify that each confirmed reservation retains its own contact details. Tests use a fixed clock to keep date-sensitive checks repeatable.

```sh
npm run test -- --run
npm run build
npm run lint
```

The current lint configuration reports some existing unused-import, unused-parameter, and Fast Refresh export warnings.

## Current limitations

- Reservations exist only in React memory. Refreshing or closing the page resets them; they are not shared across tabs, browsers, or users.
- Bookings are simulated. No real restaurant reservation is created, and no email or SMS confirmation is sent.
- Availability treats each date-and-time combination as one bookable slot, without modeling individual tables or restaurant capacity.
- Date and time validation uses the browser's local clock and timezone.
- About, Menu, and Order Online are static pages. There is no shopping cart, checkout, payment processing, or authentication.
- Testimonials are fictional samples, not verified customer reviews. Food photographs are illustrative stock images.
- `index.html` still includes the Coursera sample API script, but the booking flow uses the local mock functions in `App.jsx`.

## Production hosting

Run `npm run build` and publish the generated `dist/` directory to a static host. Configure the host to serve `index.html` for application routes such as `/reservations` so direct visits and refreshes work with `BrowserRouter`.

The current asset URLs assume deployment at the domain root. Hosting under a subdirectory requires adjusting the Vite base, router configuration, and asset paths.

## Images and branding

Food photos and Little Lemon logos are stored in `public/images/`. See [image sources and credits](public/images/CREDITS.md) for photographer links and the source of the course logo assets.
