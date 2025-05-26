# Project TODO – Freighble

Tasks to track development, scalability, polish, and UX improvements.

---

## 1. Architecture & Scalability

-   [x] Re-arrange folder/file architecture for better separation of concerns and readability
-   [x] Rename files for a more professional, readable, and clean structure
-   [ ] Implement CRUD functionality
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
-   [ ] Add favorite/blocked lanes to the suitability assessment algorithm
-   [x] Modify suitability percentage formula:
    -   [x] Scale “basic” scores better when more comparison variables are available
-   [x] Include the following additional specs to Search and to suitability filtering:
    -   C-TPAT
    -   TWIC
    -   TSA
    -   FAST
-   [x] Implement an open field to optionally type additional custom cargo instructions
-   [ ] Make additional cargo instructions functional
-   [ ] Include and make functional origin and destination dates
-   [ ] Message and button on carrier cards to prepare/send an email to that vendor
-   [ ] Make a "searches" dashboard to mark a status for each serch and keep track of work

---

## 3. User Interaction Enhancements

-   [x] Simplify suitability visualization on carrier cards
-   [ ] Implement autofill functionality for Origin/Destination input fields
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
-   [ ] Desgin a proper header/navbar

---

## 6. Code Cleanup & QA

-   [x] Clean up and standardize all test `console.log()` messages to allow easy global removal
-   [x] Clean up and standardize in-code comments

---

## Notes

-   None

---

Last updated: 2024-05-02
