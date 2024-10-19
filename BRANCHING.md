# Branching Strategy

This document outlines the branching strategy and naming conventions to maintain consistency and clarity in our development process.

---

## 📂 Branch Prefixes

Use the following prefixes to categorize your branches:

- **`feature`**: New features
- **`bug`**: Bug fixes
- **`hotfix`**: Urgent, critical fixes
- **`enhancement`**: Improvements to existing features
- **`refactor`**: Code refactoring
- **`docs`**: Documentation updates
- **`test`**: Adding or updating tests
- **`chore`**: Non-functional tasks (e.g., dependency updates)
- **`perf`**: Performance improvements
- **`style`**: Code style changes (e.g., formatting, whitespace)

---

## 📝 Naming Convention

Branch names should follow this structure for better traceability:

**`<username>/<prefix>/<issue-number or short-description>`**

### Examples:

- `joni/feature/1-add-authentication`
- `peter/bug/12-fix-login-issue`
- `parker/hotfix/123-resolve-database-error`

---

## 🚀 Creating a Branch

⚠️ **All branches must be created from the `dev` branch** to ensure they are based on the latest development code.

### Follow these steps to create a branch:

1. **Go to the Issues page in GitHub** and locate the issue you're working on.
2. **Assign the issue to yourself** to prevent overlapping work.

   <img width="802" alt="Assign issue" src="https://github.com/user-attachments/assets/fc332e6e-66c1-49e4-9701-a33127954ba6">

3. **Create the branch** using the button on the right. Follow the naming convention and ensure you set the branch source to `dev`.

   | <img width="949" alt="Set branch source" src="https://github.com/user-attachments/assets/d1dc81c5-3a40-42e6-91ca-db6f79f462a0"> | <img width="866" alt="Branch naming" src="https://github.com/user-attachments/assets/e1022125-4a7e-41e5-bc3b-ce0ba5e9f35c"> |
   | :-----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |

4. After creating the branch, **add it to the project board** under the "In Progress" column to keep your tasks organized.

   <img width="342" alt="Add to project board" src="https://github.com/user-attachments/assets/175304e0-ead5-47e1-b809-fffc9f6597f3">

5. Verify that your new branch is visible in **VS Code** under Source Control. Alternatively, you can pull the branch using other GitHub tools like GitHub Desktop.

   | <img width="412" alt="VS Code branch" src="https://github.com/user-attachments/assets/d0ad8aaa-8f1b-4b2a-bc61-760466b599b4"> | <img width="283" alt="Pull branch" src="https://github.com/user-attachments/assets/8fb1d871-8b72-4f8a-9b78-56fc33f68e5a"> |
   | :--------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |

---

## 🧠 Best Practices

- **Keep it focused**: Avoid including multiple unrelated tasks in a single branch to maintain a clean and organized codebase.
- **Be descriptive**: Use clear and concise descriptions in your branch names to make them easily identifiable.
