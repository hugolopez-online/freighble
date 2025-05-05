# Project TODO – Magic Rolodex

Tasks to track development, scalability, polish, and UX improvements.

---

## 1. Architecture & Scalability

### [HIGH] Reorganize and prepare for scale
- [X] Re-arrange folder/file architecture for better separation of concerns and readability
- [X] Rename files for a more professional, readable, and clean structure
- [ ] Set up a reducer (and optionally use context hooks) to manage state more cleanly
- [ ] [BLOCKED: requires DB setup] Implement CRUD functionality
- [ ] Set up a proper database to move vendor information out of hardcoded/static files

---

## 2. Core Functionality & Performance

### [HIGH] Core interactions and data logic
- [ ] Assess and potentially modify the method used to display searched carriers (improve performance or structure)
- [ ] Fix key ID assignment for iterated items to avoid React key warning and improve diffing
- [ ] Add favorite/blocked lanes to the suitability assessment algorithm
- [ ] Modify suitability percentage formula:
  - [ ] Scale “basic” scores better when more comparison variables are available

---

## 3. User Interaction Enhancements

### [MEDIUM] Input UX and interaction polish
- [X] Simplify suitability visualization on carrier cards
- [ ] Implement autofill functionality for Origin/Destination input fields
- [ ] Improve form interaction feedback:
  - [X] Highlight invalid or incomplete fields on submit
  - [ ] Scroll to the first field that needs user attention

---

## 4. Communication Between Components

### [MEDIUM] Data flow & coordination
- [ ] Refactor the banner component logic:
  - [ ] Improve communication between banner and other components
  - [X] Possibly move banner to be a sibling of Search and Vendors, not a child

---

## 5. Polish & Visual Presentation

### [LOW] Make it visually deliverable
- [X] Style the page to look presentable (use Bootstrap as the main styling library)
- [ ] Message and button on carrier cards to prepare/send an email to that vendor

---

## 6. Code Cleanup & QA

### [LOW] Maintainability and testability
- [X] Clean up and standardize all test `console.log()` messages to allow easy global removal
- [X] Clean up and standardize in-code comments

---

## Notes

- All the app keeps re-rendering with every change in the search form.

---

Last updated: 2024-05-02  