# React Authentication & Contact Forms UI Kit v1.1

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Aesthetics](https://img.shields.io/badge/UI-Premium-FF69B4)
![License](https://img.shields.io/badge/license-Regular-orange)

> **A professional, ThemeForest-ready React UI Kit** featuring 4 highly polished forms, 6 dynamic color themes, and a modern refactored architecture using custom hooks and centralized utilities.

---

## ✨ Key Enhancements in v1.1

- **Refactored Architecture**: Moved repetitive logic into a centralized `useForm` custom hook for better maintainability.
- **Advanced UI**: Implemented **Glassmorphism** in the header and **Staggered Entrance Animations** for all form elements.
- **Centralized Assets**: Consolidated all SVG icons into a single, optimized `Icons.jsx` component.
- **Premium Aesthetics**: Refined typography, smooth transitions, and polished shadows for a high-end feel.

---

## 🚀 Features

| Category | Highlights |
|---|---|
| **Form Collection** | Login, Professional Register, Contact (with counter), Secure Forgot Password |
| **Theming System** | 6 Built-in Themes (Blue, Green, Purple, Red, Orange, Dark) driven by CSS variables |
| **UX & Motion** | Staggered animations, glassmorphism, instant theme switching, loading spinners |
| **Social Login** | Google & GitHub buttons (pre-styled) |
| **Navigator** | Smooth cross-form navigation links (Sign In ↔ Sign Up) |
| **Logic & Validation** | Centralized `useForm` hook, custom validation, password strength meter |
| **Responsive Design** | Mobile-first approach, fluid layouts for all devices |
| **Tech Blueprint** | React 19 + Vite 7 + Vanilla CSS (Zero External Dependencies) |

---

## 🏗️ Project Architecture

```bash
src/
├── components/
│   ├── LoginForm.jsx          # Refactored Login logic
│   ├── RegisterForm.jsx       # Signup with Strength Meter
│   ├── ContactForm.jsx        # Contact with Char Counter
│   ├── ForgotPasswordForm.jsx # Secure Reset Flow
│   └── Icons.jsx              # Optimized Centralized SVGs
├── utils/                     # Shared Logic
│   ├── form-utils.js          # useForm hook + Validation
│   └── cn.js                  # Classname merging utility
├── themes/                    # CSS Variable Collections
│   ├── blue.css, green.css, etc.
├── App.jsx                    # Application Shell & Theme Engine
└── index.css                  # Core Design System & Global Styles
```

---

## ⚡ Quick Start

```bash
# Clone or Unzip the project
cd react-forms-ui-kit

# Install premium dependencies
npm install

# Launch development server
npm run dev
```

Visit `http://localhost:5173` to explore the live interactive demo.

---

## 🛠️ Developer Guide

### Using the `useForm` Hook

The kit now features a powerful `useForm` utility that handles state, input changes, and validation automatically.

```javascript
import { useForm } from '../utils/form-utils';

const validate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  return errors;
};

const { values, errors, handleChange, validate: runValidation } = useForm({ email: '' }, validate);
```

### Adding a New Theme

1. Create a new CSS file in `src/themes/`.
2. Define your color palette using the existing CSS variables (e.g., `--primary`, `--app-bg`).
3. Import the file in `App.jsx` and add it to the `THEMES` array.

---

## 🎨 Design System (CSS Variables)

We use a clean, variable-driven approach for theming:

| Variable | Purpose |
|---|---|
| `--primary` | Main brand accent color |
| `--app-bg` | Global application background |
| `--card-bg` | Glassmorphic or solid card backgrounds |
| `--transition-base` | Standard 0.3s cubic-bezier motion |
| `--card-shadow` | Premium elevation effects |

---

## � Production Ready

This UI kit is optimized for performance and ready for deployment.

```bash
npm run build
```

---

## 📄 License

**Regular License** — For one end product (personal or commercial).  
**Extended License** — For use in SaaS or products sold to multiple clients.

---

## 🙏 Credits

- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts  
- **Icons:** Centralized SVG (No external dependency)

---

*Made with ❤️ for developers by **ThemeForest Author**. If you love this product, please rate us ⭐⭐⭐⭐⭐!*
