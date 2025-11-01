# Mini

This repository contains a full-stack example with `backend/` (Node.js) and `frontend/` (Vite + React + Tailwind).

Quick notes:

- Backend: `backend/` (Express, controllers, models)
- Frontend: `frontend/` (React components, pages, services)

How to push this project to GitLab

1. Create a new empty repository on GitLab (no README, no license) and copy the repository HTTPS (or SSH) URL.

2. On your machine, from the repository root (where this README lives), run:

```powershell
git remote add origin <GITLAB_REPO_URL>
git branch -M main
git push -u origin main
```

If you haven't already, this repo will be initialized and committed locally by the helper script run in this workspace.

If you prefer I can add the remote and push for you — provide the GitLab repo URL (HTTPS or SSH) and I will run the commands.

Troubleshooting

- If git prompts about user.name/user.email, configure them with:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

- If your push is rejected due to protected branches, create and push to a different branch then open a merge request on GitLab.
