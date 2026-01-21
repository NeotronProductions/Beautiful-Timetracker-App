# Pull Request Guide

## What is a Pull Request?

A **Pull Request (PR)** is a way to propose merging changes from one branch into another branch. It's a collaborative tool that allows code review, discussion, and controlled integration of new features.

## What a Pull Request Does:

### 1. **Proposes a Merge**
- Suggests merging your branch (e.g., `development`) into a target branch (typically `main`)
- Shows exactly what would change if the merge happens

### 2. **Shows All Changes**
- Displays a complete diff of all files that would be added, modified, or deleted
- In your case, a PR from `development` → `main` would show:
  - Files from `copilot/add-timetracking-webapp`
  - Files from `copilot/add-user-time-tracking`
  - Files from `feature/issue-528`, `feature/issue-542`, `feature/issue-707`, `feature/issue-724`
  - Documentation updates (README.md, PROJECT_CONTEXT.md, SERVER_SETUP.md, etc.)
  - Implementation plans and guides

### 3. **Enables Code Review**
- Team members can review the code before it's merged
- Reviewers can:
  - Comment on specific lines of code
  - Request changes
  - Approve the PR
  - Suggest improvements

### 4. **Facilitates Discussion**
- Comment on specific lines or sections
- Ask questions about implementation decisions
- Discuss potential issues or improvements
- All discussion is preserved in the PR history

### 5. **Runs Automated Checks** (if configured)
- Runs tests automatically
- Checks for linting errors
- Validates code quality
- Ensures the code builds successfully

### 6. **Provides Merge Options** (when approved)
- **Merge commit**: Creates a merge commit (preserves full history)
- **Squash and merge**: Combines all commits into one clean commit
- **Rebase and merge**: Replays commits on top of the target branch

## In Your Project Context:

### Current State:
- `main` branch: Contains the stable, production-ready code
- `development` branch: Contains all merged feature branches:
  - `copilot/add-timetracking-webapp`
  - `copilot/add-user-time-tracking`
  - `feature/issue-528` (Performance testing)
  - `feature/issue-542` (Test responsiveness)
  - `feature/issue-707` (US-002: Select Active Project)
  - `feature/issue-724` (Write toggle tests)
  - Plus documentation and implementation guides

### Creating a PR from `development` → `main`:
- Would bring all the merged feature work into `main`
- Makes `development` the new stable branch
- Allows review before merging to production

## Common Workflow:

### Option 1: Development Branch Strategy
```
feature/issue-XXX → development → main
```
- Feature branches merge into `development`
- When ready, create PR: `development` → `main`
- `development` stays as a long-lived integration branch

### Option 2: Direct Feature PRs
```
feature/issue-XXX → main
```
- Each feature branch creates a PR directly to `main`
- `development` is used for experimental/integration work

### Option 3: Release Branches
```
feature/issue-XXX → development → release/v1.0 → main
```
- `development` is the integration branch
- `release/v1.0` is created for a specific release
- PR: `release/v1.0` → `main` when ready to deploy

## How to Create a Pull Request:

### Via GitHub Web Interface:
1. Go to your repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select:
   - **Base branch**: `main` (where you want to merge TO)
   - **Compare branch**: `development` (what you want to merge FROM)
5. Review the changes
6. Add a title and description
7. Click "Create pull request"

### Via GitHub CLI (if installed):
```bash
gh pr create --base main --head development --title "Merge development into main" --body "Description of changes"
```

### Via Git Command Line:
```bash
# Push your branch (if not already pushed)
git push -u origin development

# Then create PR via GitHub web interface or CLI
```

## Best Practices:

1. **Clear Title**: Use descriptive titles (e.g., "Merge development branch with all feature integrations")

2. **Detailed Description**: Explain:
   - What changes are included
   - Why these changes are needed
   - How to test the changes
   - Any breaking changes

3. **Link Related Issues**: Reference issue numbers (e.g., "Fixes #528, #542, #707, #724")

4. **Request Reviewers**: Tag team members who should review

5. **Small, Focused PRs**: Easier to review than massive changes

6. **Keep PRs Updated**: Rebase or merge `main` into your branch if it gets behind

## Example PR Description:

```markdown
## Summary
This PR merges the `development` branch into `main`, integrating all completed feature work.

## Changes Included
- ✅ Project-based time tracking (issue #707)
- ✅ Performance testing implementation (issue #528)
- ✅ Responsiveness testing (issue #542)
- ✅ Toggle tests (issue #724)
- ✅ Documentation updates (README, setup guides)

## Testing
- [ ] Test project selection and timer functionality
- [ ] Verify localStorage persistence
- [ ] Check responsive design on mobile devices
- [ ] Run all automated tests

## Related Issues
Closes #528, #542, #707, #724

## Screenshots (if applicable)
[Add screenshots of UI changes]
```

## After the PR is Merged:

1. **Update Local Branches**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Clean Up** (optional):
   ```bash
   # Delete merged feature branches locally
   git branch -d feature/issue-528
   git branch -d feature/issue-542
   # etc.
   ```

3. **Continue Development**:
   - Create new feature branches from `main` or `development`
   - Continue the cycle

## Summary:

A Pull Request is your way to:
- ✅ **Propose** changes for review
- ✅ **Collaborate** with your team
- ✅ **Review** code before merging
- ✅ **Control** what goes into production
- ✅ **Document** why changes were made

It's the bridge between "work in progress" and "production-ready code"!
