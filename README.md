# Magic Rolodex

## Description

A specialized search engine for logistics professionals that helps match freight transportation needs with suitable vendors. Designed to expedite vendor look-up, based on multiple criteria, such as:  
- origin and destination  
- transportation mode  
- load specifications  

The current scope of its functionality is for loads and carriers within Canada, U.S., and Mexico only.

> **!! IMPORTANT DISCLAIMER !!**  
> Please note that at this stage of development,  
> the vendors displayed with current searches are  
> mock vendors, they're not real or the information  
> shown is very likely made up or extremely inaccurate.  

## Tech Stack

- **Frontend**  
    - `React.js` for UI design  
    - `Bootstrap` for styling and visuals  
    - `HTML`  
    - `CSS`  
    - `JavaScript`  

- **Backend & Tooling**  
    - `Node.js`  
    - `Vite.js`  

## Getting Started

1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Run `npm run dev` to start the development server  

## Features

### Current

- Search form with fields for:  
    - Transportation mode  
    - Origin (city and state/province)  
    - Destination (city and state/province)  
    - Border crossing, if applicable  
    - Additional load specs (hazmat, team drivers, bond)  
- Dynamic banner that displays the details of the load whose results are currently visible, and includes buttons to clear the results and to template the current search for a new one.  
- Results area that displays the vendors that best match the searched criteria.  
- Vendor cards displaying important key information about the company, matching offered services, and suitability score.  

### Planned

- Autocomplete function for location fields in the search form  
- Ergonomic feedback for user's actions  
- Recognition and scoring of favorite and blocked lanes  
- Button to prepare and send emails for vendor outreach  