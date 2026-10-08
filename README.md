# Harsh Singh Rawat - Portfolio

A minimalist, developer-focused personal portfolio website.

## Features

- **No build steps**: Pure HTML, CSS, and Vanilla JavaScript.
- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Dark-first interface**: Professional, coder-oriented aesthetic.
- **Data separation**: Content is neatly separated in `js/data.js` for easy updates.
- **Accessibility**: Semantic HTML and respects `prefers-reduced-motion`.

## Local Development

Since this project uses plain HTML/CSS/JS without imports that require a bundler, you can view it directly in your browser:

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. No local server is strictly required unless you want to test module features in the future. If you do want a local server, you can use:
   ```bash
   python -m http.server 8000
   ```
   and navigate to `http://localhost:8000`.

## Updating Content

All personal data (experience, skills, projects) is stored in `js/data.js`. 
To update your resume information, simply edit the JavaScript object in that file. The UI will automatically render the new content.

## Deployment to GitHub Pages

This project is perfectly structured for GitHub Pages deployment.

1. Initialize a Git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new public repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/harshrawat349/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings > Pages**.
4. Under **Source**, select the **Deploy from a branch** option.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. Wait a minute or two, and your site will be live at `https://harshrawat349.github.io/portfolio/`.

## Design Decisions
- **Terminal Theme**: Subtle terminal-style animations and fonts (`JetBrains Mono`) are used without overwhelming the professional feel.
- **Animations**: CSS transitions and a slight typing animation on load set a calm but technical tone.
- **Accordion Experience**: To present dense experience points efficiently, an interactive accordion style is used to expand/collapse subsections.
