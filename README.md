# Magic Rolodex

## Description

Specialized search engine for logistics professionals to match freight transportation needs with suitable vendors.

The current scope of its functionality is for loads and carriers within Canada, U.S., and Mexico only.

> **IMPORTANT DISCLAIMER!**  
> At this stage of development, it's mock vendors being used for testing - either they're not real companies or the displayed information is made up and extremely inaccurate.

## Tech Stack

-   **Frontend**

    -   `React.js`
    -   `Bootstrap`
    -   `HTML`
    -   `CSS`
    -   `JavaScript`

-   **Backend & Tooling**
    -   `Node.js`
    -   `Vite.js`

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Features

### Current

-   Search form with fields for:
    -   Transportation mode
    -   Origin (city and state/province)
    -   Destination (city and state/province)
    -   Border crossing port, if applicable
    -   Additional load specs (hazmat, team drivers, bond)
-   Dynamic banner that displays the details of the load whose results are currently visible, including buttons to clear the results and to template the current search for a new one.
-   Results area that displays the vendors that best match the searched criteria.
-   Vendor cards displaying key information about the company, matching variables, and suitability score.

### Planned

-   Autocomplete function for location fields in the search form
-   Ergonomic feedback for user's actions
-   Recognition and scoring of favorite and blocked lanes
-   Button to prepare and send emails for vendor outreach
