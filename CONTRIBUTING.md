# Contributing guide

## Commit and Issue Guidelines

To maintain a clean and consistent history, we follow a strict format for **commit messages** and **issue titles**. Please read carefully and refer to the examples provided below.

---

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard:

```
<type>(<scope>): <description>
```

#### 🔹 Examples (Correct)

```
feat(auth): add signup form validation
fix(api): prevent crash on empty payload
chore(ci): update GitHub workflow for linting
refactor(styles): simplify theme switcher logic
```

#### 🔸 Examples (Incorrect)

```
fixed bug in login page
added feature
update code
chore: fix
```

---

### Issue Title Format

Each issue title should reflect the type and scope, written in this format:

```
[TYPE][SCOPE] Short description of the problem or request
```

#### 🔹 Examples (Correct)

-   `[BUG][FORM] Whitespace in first name field causes error`
-   `[FEAT][AUTH] Allow login with GitHub OAuth`
-   `[CHORE][CONFIG] Update ESLint rules for consistency`

#### 🔸 Examples (Incorrect)

-   `bug in form`
-   `add github login`
-   `fix it pls`

---

### Allowed Types

Use lowercase for commits, uppercase (in brackets) for issues.

| Type       | Purpose                                       |
| ---------- | --------------------------------------------- |
| `feat`     | New feature                                   |
| `fix`      | Bug fix                                       |
| `chore`    | Maintenance (no user-facing change)           |
| `docs`     | Documentation updates                         |
| `refactor` | Code change without altering behavior         |
| `style`    | Formatting, whitespace, etc. (non-functional) |
| `test`     | Adding or fixing tests                        |
| `ci`       | Continuous integration or tooling             |
| `perf`     | Performance improvement                       |

---

### Allowed Scopes

Use one of these to describe **where** the change applies. If unsure, choose the most specific relevant one.

| Scope    | Description                       |
| -------- | --------------------------------- |
| `auth`   | Authentication and user login     |
| `form`   | Forms and form validation         |
| `api`    | API routes and related logic      |
| `db`     | Database setup or schema          |
| `styles` | CSS, Tailwind, or UI-related code |
| `config` | Configuration files or tooling    |
| `ci`     | CI/CD pipelines, GitHub Actions   |
| `deps`   | Dependencies and packages         |
| `docs`   | Markdown files and documentation  |
| `layout` | General layout structure          |
| `utils`  | Utility functions                 |

---

### Tips

-   Keep descriptions short but meaningful.
-   Use the **imperative mood** (“add”, not “added” or “adds”).
-   Your commit and issue formats help automate changelogs, releases, and improve readability.

Thank you for keeping the project tidy and consistent.
