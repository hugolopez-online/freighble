# Freighble

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
    -   `Express.js`
    -   `Vite.js`

## Getting Started

1. Fork and clone the repo
2. Run `npm install` to install dependencies (pointing to root directory)
3. Run `npm run dev` to start Vute's development environment (pointing to root directory)
4. In a separate terminal run `nodemon server.cjs` to boot up the Express.js server (pointing to root directory)

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
-   Autocomplete function for location fields in the search form
-   Recognition and scoring of favorite and blocked lanes
-   Button to prepare and send emails for vendor outreach

### Planned

-   Search log and history
-   Vendor rating
-   Strategic data visualization: statistics on user searches vs. matching results
