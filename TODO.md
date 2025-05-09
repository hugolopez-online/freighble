# Project TODO – Magic Rolodex

Tasks to track development, scalability, polish, and UX improvements.

---

## 1. Architecture & Scalability

### [HIGH] Reorganize and prepare for scale

-   [x] Re-arrange folder/file architecture for better separation of concerns and readability
-   [x] Rename files for a more professional, readable, and clean structure
-   [ ] Set up a reducer (and optionally use context hooks) to manage state more cleanly
-   [ ] [BLOCKED: requires DB setup] Implement CRUD functionality
-   [ ] Set up a proper database to move vendor information out of hardcoded/static files

---

## 2. Core Functionality & Performance

### [HIGH] Core interactions and data logic

-   [x] Assess and potentially modify the method used to display searched carriers (improve performance or structure)
-   [ ] Fix key ID assignment for iterated items to avoid React key warning and improve diffing
-   [ ] Add favorite/blocked lanes to the suitability assessment algorithm
-   [x] Modify suitability percentage formula:
    -   [x] Scale “basic” scores better when more comparison variables are available
-   [ ] Include the following additional specs to Search and to suitability filtering:
    -   C-TPAT
    -   TWIC
    -   TSA
    -   FAST
-   [ ] Implement an open field to optionally type additional custom cargo specifications

---

## 3. User Interaction Enhancements

### [MEDIUM] Input UX and interaction polish

-   [x] Simplify suitability visualization on carrier cards
-   [ ] Implement autofill functionality for Origin/Destination input fields
-   [x] Improve form interaction feedback:
    -   [x] Highlight invalid or incomplete fields on submit
    -   [x] Scroll to the first field that needs user attention

---

## 4. Communication Between Components

### [MEDIUM] Data flow & coordination

-   [x] Refactor the banner component logic:
    -   [x] Improve communication between banner and other components
    -   [x] Possibly move banner to be a sibling of Search and Vendors, not a child

---

## 5. Polish & Visual Presentation

### [LOW] Make it visually deliverable

-   [x] Style the page to look presentable (use Bootstrap as the main styling library)
-   [ ] Message and button on carrier cards to prepare/send an email to that vendor

---

## 6. Code Cleanup & QA

### [LOW] Maintainability and testability

-   [x] Clean up and standardize all test `console.log()` messages to allow easy global removal
-   [x] Clean up and standardize in-code comments

---

## Notes

-   None

---

Last updated: 2024-05-02
