# Contributing Guide

Thank you for considering contributing to this project!  
To ensure clarity and consistency across contributions, we follow a standardized format for:

-   Commit messages
-   Issue titles
-   Branch names

All of these share the same **types** and **scopes**. Below you'll find the complete guide.

> 📝 In the format templates below:
>
> -   **Curly braces `{...}`** indicate optional parts — do **not** include the braces.
> -   **Angle brackets `<...>`** represent placeholders — also to be replaced, **not** typed literally.

## Format Overview

### Conventional Commit Format

```
<type>{(<scope>)}: short description
```

**Examples:**

```
feat(ui): improve accessibility for modal buttons

docs: correct typos in README.md
```

---

### Issue Title Format

Using the same **types** and **scopes** as commits, only in uppercase and between square brackets.

```
[<TYPE>]{[<SCOPE>]} short description
```

**Examples:**

```
[FIX][AUTH] handle expired token redirects

[DOCS] update TODO.md
```

---

### Branch Name Format

```
<type>/<scope>/{#<issue-number>/}{@<edge-or-special-case>/}short-description
```

**Examples:**

```
feat/form/#42/add-password-validation

fix/ui/#61/make-input-heights-consistent

feat/perf/@serverless/create-serverless-alternative
```

#### 🧪 Edge Cases & Special Tags

If your branch has a unique situation (e.g., an experiment, alternative direction, migration), use the optional `@` symbol in the branch name.

**Example:**

```
feat/ui/@experimental/grid-layout-alternative
```

---

## 🧾 Guide reference

### Accepted Types

| Type       | Description                                            |
| ---------- | ------------------------------------------------------ |
| `feat`     | A new feature or enhancement                           |
| `fix`      | A bug fix                                              |
| `chore`    | Maintenance tasks (rarely affects behavior)            |
| `docs`     | Documentation-only changes                             |
| `refactor` | Code cleanup that doesn't change behavior              |
| `style`    | Code formatting, white-space, linting (non-functional) |
| `perf`     | Performance improvements                               |
| `infra`    | Build tools, CI/CD, environment config                 |
| `build`    | Changes that affect the build system or dependencies   |
| `revert`   | Reverts a previous commit                              |
| `wip`      | Work in progress (not yet ready for merging)           |
| `test`     | Adding/editing tests                                   |

---

### Accepted Scopes

| Scope    | Description                                   |
| -------- | --------------------------------------------- |
| `ui`     | User interface components or styling          |
| `form`   | Form validation, layout, input UX             |
| `auth`   | Authentication, session, user management      |
| `api`    | API interaction, request/response logic       |
| `srv`    | Backend logic modifications/improvements      |
| `deps`   | Dependencies and package changes              |
| `config` | ESLint, Prettier, Git, Docker, etc. config    |
| `ci`     | GitHub Actions, pipelines, deployment scripts |

> You can suggest new scopes if needed. Use concise and meaningful terms.

### Descriptions style

A verb describing what the modification/feature/fix does, which must be in its imperative form (`create`✅ instead of `creation`❌ or `created`❌), followed by a short sentence of its target or effect (e.g: `chore(ci): delete unused classes`).

---

## Examples: Good vs. Bad

| Context     | Correct                                        | Wrong                       |
| ----------- | ---------------------------------------------- | --------------------------- |
| Commit      | `fix(ui): align card titles properly`          | `fix cards`                 |
| Issue Title | `[FEAT][form]: add password strength meter`    | `add meter`                 |
| Branch Name | `refactor/api/#34/remove-deprecated-endpoints` | `issue-34-fix-endpoint-bug` |

---

Thank you for helping keep our project organized and maintainable!
