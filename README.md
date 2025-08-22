# Portfolio Resume

A modern, minimalist portfolio website built with Vite, Three.js, and vanilla JavaScript. Features an interactive 3D background animation and smooth scrolling navigation.

## 🚀 Features

- **Modern Design**: Clean, minimalist interface with smooth animations
- **Three.js Background**: Interactive 3D particle animation that responds to mouse movement
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Scroll Animations**: Elements fade in as you scroll through the page
- **Interactive Elements**: Hover effects and animated statistics
- **Mobile-Friendly**: Hamburger menu for mobile devices

## 📋 Sections

1. **Hero Section**: Introduction with animated title and call-to-action buttons
2. **About Me**: Personal description with animated statistics
3. **Work Experience**: Timeline of professional experience
4. **Education**: Academic background and achievements
5. **Skills**: Technical skills organized by category
6. **Projects**: Portfolio of completed projects with links

## 🛠️ Technologies Used

- **Vite**: Fast build tool and development server
- **Three.js**: 3D graphics library for background animation
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **HTML5**: Semantic markup

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
```json
{
  "homepage": "https://yourusername.github.io/portfolio"
}
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

3. Go to your GitHub repository settings and enable GitHub Pages from the `gh-pages` branch.

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── main.js          # Main JavaScript file with Three.js and portfolio logic
│   └── style.css        # All styles and animations
├── index.html           # Main HTML structure
├── package.json         # Project configuration
└── README.md           # This file
```

## 🎨 Customization

### Colors
Update the CSS custom properties in `src/style.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  /* ... other colors */
}
```

### Content
- Update personal information in `index.html`
- Modify the Three.js background in `src/main.js`
- Customize animations and effects

### Three.js Background
The background animation can be customized in the `BackgroundAnimation` class:
- Change particle count, size, and colors
- Modify animation speed and behavior
- Adjust mouse interaction sensitivity

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Vite](https://vitejs.dev/) for the build tool
- [Inter Font](https://rsms.me/inter/) for typography
- [GitHub Pages](https://pages.github.com/) for hosting

---

Made with ❤️ using modern web technologies
