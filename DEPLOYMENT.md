# Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Node.js and npm installed

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository `portfolio` (or any name you prefer)
4. Make it public
5. Don't initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Update Configuration

1. Update the `homepage` field in `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/portfolio"
}
```
Replace `yourusername` with your actual GitHub username.

2. If you named your repository something other than `portfolio`, update the base path in `vite.config.js`:
```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## Step 3: Push to GitHub

1. Initialize git (if not already done):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit the changes:
```bash
git commit -m "Initial commit: Portfolio website"
```

4. Add your GitHub repository as remote:
```bash
git remote add origin https://github.com/yourusername/portfolio.git
```

5. Push to GitHub:
```bash
git push -u origin main
```

## Step 4: Deploy to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

This will:
- Build your project for production
- Create a `gh-pages` branch
- Push the built files to that branch

## Step 5: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

## Step 6: Access Your Website

Your portfolio will be available at:
```
https://yourusername.github.io/portfolio
```

It may take a few minutes for the changes to appear.

## Updating Your Website

Whenever you make changes to your portfolio:

1. Commit and push your changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```

2. Deploy the updated version:
```bash
npm run deploy
```

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check that all import paths are correct
- Verify that Three.js is properly imported

### Deployment Issues
- Ensure the `homepage` field in `package.json` is correct
- Check that the repository name matches in `vite.config.js`
- Make sure the `gh-pages` package is installed: `npm install gh-pages --save-dev`

### GitHub Pages Not Loading
- Wait a few minutes for GitHub Pages to build
- Check the "Actions" tab in your repository for build status
- Verify the `gh-pages` branch exists and contains the built files

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your repository settings
2. Scroll to "Pages" section
3. Enter your custom domain in the "Custom domain" field
4. Update your DNS settings to point to GitHub Pages
5. Update the `homepage` field in `package.json` to your custom domain

## Performance Tips

- The Three.js background is optimized for performance
- Images are automatically optimized during build
- CSS and JavaScript are minified for production
- Consider adding a loading screen for slower connections

---

Your portfolio is now live! 🎉
