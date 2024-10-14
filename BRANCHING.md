# Branching Strategy

This document outlines the branching strategy and naming conventions to be followed in this project.

## Branch Prefixes

- `feature`: For new features
- `bug`: For bug fixes
- `hotfix`: For urgent, critical fixes
- `enhancement`: For improvements to existing features
- `refactor`: For code refactoring
- `docs`: For documentation updates
- `test`: For adding or updating tests
- `chore`: For non-functional tasks (e.g., dependency updates)
- `perf`: For performance improvements
- `style`: For code style changes (formatting, whitespace, etc.)

---

## Naming Convention

Branch names should be prefixed by your username, followed by the type of task you're working on. They should also reference the issue number or provide a short description of the task.

### Example:

- `joni/feature/1-add-authentication`
- `peter/bug/12-fix-login-issue`
- `parker/hotfix/123-resolve-database-error`

---

## Creating a Branch

⚠️ All branches must be created from the **dev** branch to ensure your work is based on the latest development code.

### Follow these steps when creating a branch:

1. Go to the **Issues** page in GitHub.
2. **Assign the issue to yourself** to avoid conflicts where others may work on the same issue simultaneously.

   ![Assign issue to yourself](https://github.com/user-attachments/assets/14faf6c9-6102-49af-ab51-69a01404cc87)

3. Use the **branch naming convention** as outlined above.
4. Make sure to change the source branch to **dev** (see the images below).

| ![Change source branch](https://github.com/user-attachments/assets/c7bcd00b-8e0c-4cfb-a939-82c07b89fb7a) | ![Create new branch](https://github.com/user-attachments/assets/5598fd93-4bf0-42c5-b0b8-707d94ed10d2) |
| :------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |

---

5. After successfully creating the branch, **add it to the project board** under "In Progress" to track your work.

   ![Add to project board](https://github.com/user-attachments/assets/71279c4e-744d-47e0-9280-cbc16ea67caf)

6. If everything is done correctly, you should see your new branch in **VS Code** under Source Control, where it will be linked to the project. Alternatively, you can **pull the branch** using other GitHub options, such as GitHub Desktop or pulling via URL.

   | ![Branch in VS Code](https://github.com/user-attachments/assets/ba9b3273-4a84-4a2b-911f-307cf813c256) | ![Pull options](https://github.com/user-attachments/assets/a787a525-2d4b-4f30-a1cc-181b028bfc95) |
   | :---------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |

---

## Pull Request

Once your task is complete, you can create a pull request from the main GitHub window or the **Pull Requests** tab.

<img width="931" alt="image" src="https://github.com/user-attachments/assets/0715ab6e-a8f9-482f-abf3-1c82bd587c2d">

- Alternatively, you can create a pull request directly from **VS Code** using the **Pull Requests** extension.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/e04a9172-ed09-40ff-8750-ae8fd8f320c1">

### Pull Request Title and Description

- **Title:** The pull request title should follow the branch naming format and briefly describe the purpose of the changes.

  **Example:** `joni/feature/123-add-authentication`

- **Description:**

  - Start the description with **`Fixes #issue_number`** to automatically close the related issue when the pull request is merged.
  - Provide a clear and concise explanation of what the pull request does, including any important details that reviewers should be aware of.

  ![Pull request description example](https://github.com/user-attachments/assets/d21b1de3-c95f-46d5-b8d8-f1a1a0e25386)

- After submitting your pull request, you can move on to the next task. However, make sure you have allocated time to address any feedback or additional fixes that might come up in the review process, so you can ensure your changes are completed and merged.

---

## Notes

- Avoid doing multiple unrelated tasks in a single branch.
