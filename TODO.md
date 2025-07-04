# Project TODO – Freighble

Tasks to track development, scalability, polish, and UX improvements.

---

## 1. Architecture & Scalability

-   [x] Re-arrange folder/file architecture for better separation of concerns and readability
-   [x] Rename files for a more professional, readable, and clean structure
-   [ ] Implement CRUD functionality
-   [ ] Re-design vendor's model
-   [x] Set up a proper database to move vendor information out of hardcoded/static files
    -   [x] Build full API to access all data dynamically
-   [ ] Capture and store user-specific search data for analysis. Use it to:
    -   Compare searches against the available carrier database
    -   Generate a visual dashboard to identify carrier development priorities
    -   Build a personalized task tracker for the user
-   [x] Migrate the server to Express.js for API handling

---

## 2. Core Functionality & Performance

-   [x] Assess and potentially modify the method used to display searched carriers (improve performance or structure)
-   [x] Fix key ID assignment for iterated items to avoid React key warning and improve diffing
-   [x] Add favorite/blocked lanes to the suitability assessment algorithm
-   [x] Modify suitability percentage formula:
    -   [x] Scale “basic” scores better when more comparison variables are available
-   [ ] Include the following additional specs to Search and to suitability filtering:
    -   [x] C-TPAT
    -   [x] TWIC
    -   [x] TSA
    -   [x] FAST
    -   [ ] Tanker Endorsement
-   [x] Implement an open field to optionally type additional custom cargo instructions
-   [x] Make additional cargo instructions functional
-   [x] Include and make functional origin and destination dates
-   [x] Message and button on carrier cards to prepare/send an email to that vendor
-   [ ] Register/login implementation

---

## 3. User Interaction Enhancements

-   [x] Simplify suitability visualization on carrier cards
-   [x] Implement autofill functionality for Origin/Destination input fields
    -   [x] Include full data for suggestion fetching
-   [x] Improve form interaction feedback:
    -   [x] Highlight invalid or incomplete fields on submit
    -   [x] Scroll to the first field that needs user attention

---

## 4. Communication Between Components

-   [x] Refactor the banner component logic:
    -   [x] Improve communication between banner and other components
    -   [x] Possibly move banner to be a sibling of Search and Vendors, not a child

---

## 5. Polish & Visual Presentation

-   [x] Style the page to look presentable (use Bootstrap as the main styling library)
-   [x] Desgin a proper header/navbar

---

## 6. Code Cleanup & QA

-   [x] Clean up and standardize all test `console.log()` messages to allow easy global removal
-   [x] Clean up and standardize in-code comments
-   [ ] Improve conditional statements

---

## Notes

-   None

---

Last updated: 2025-06-19
