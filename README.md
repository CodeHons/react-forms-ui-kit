# Premium React Authentication & Contact Forms UI Kit
[![React Version](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-7.0.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)]()
[![License](https://img.shields.io/badge/License-ThemeForest-green.svg)]()

A high-end, production-ready collection of form components designed with precision, performance, and developer experience in mind. Perfect for SaaS, Dashboards, and Modern Landing Pages.

---

## ✨ Key Highlights
*   **Premium Aesthetics**: Modern glassmorphism, organic layered shadows, and fluid staggered animations.
*   **Zero Dependencies**: Built with pure React 19 and Vanilla CSS. No bulky UI libraries (Tailwind/Bootstrap) required.
*   **Theme Engine**: 6 hand-crafted color themes driven by modular CSS variables.
*   **Developer First**: Centralized `useForm` custom hook for complex state logic and validation.
*   **Ready for Social**: Integrated Google and GitHub login UI.
*   **SEO & Accessibility**: Semantic HTML5 with focus management and ARIA labels.

---

## 🛠 Tech Stack
- **Framework**: React 19 (Functional Components)
- **Bundler**: Vite 7 (Lightning fast development & optimized build)
- **Styling**: Vanilla CSS (CSS Variables / Custom Properties)
- **Icons**: Optimized SVG React Components

---

## 🚀 Quick Start

### 1. Installation
```bash
# Extract the package and install dependencies
npm install

# Start development server
npm run dev
```

### 2. Basic Usage
```jsx
import LoginForm from './components/LoginForm';

function App() {
  const handleLogin = async (data) => {
    // Connect to your API here
    console.log('Logging in with:', data);
  };

  return (
    <LoginForm 
      onSubmit={handleLogin} 
      title="Welcome Back" 
    />
  );
}
```

---

## 📖 Component API Reference

All components are fully standardized with the following props for maximum flexibility:

### `LoginForm`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Sign in"` | Main heading for the form. |
| `subtitle` | `string` | `"Welcome back..."` | Descriptive text below the title. |
| `onSubmit` | `async func` | `Mock Delay` | Async function receiving form `{ email, password, remember }`. |
| `onForgot` | `func` | `null` | Triggered when "Forgot password?" is clicked. |
| `onSwitch` | `func` | `null` | Triggered for navigation to registration. |

### `RegisterForm`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Create account"` | Main heading for the registration form. |
| `subtitle` | `string` | `"Join us today..."` | Secondary descriptive text. |
| `onSubmit` | `async func` | `Mock Delay` | Async function receiving `{ name, email, password, confirm }`. |
| `onSwitch` | `func` | `null` | Triggered for navigation to login. |

### `ContactForm`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Get in touch"` | Main heading for the contact form. |
| `subtitle` | `string` | `"We'd love to..."` | Secondary descriptive text. |
| `onSubmit` | `async func` | `Mock Delay` | Async function receiving `{ name, email, subject, message }`. |

### `ForgotPasswordForm`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Forgot password?"`| Main heading for the reset flow. |
| `subtitle` | `string` | `"No worries!..."` | Secondary descriptive text. |
| `onSubmit` | `async func` | `Mock Delay` | Async function receiving `{ email }`. |
| `onBack` | `func` | `null` | Triggered to return to the sign-in screen. |

---

## 🎨 Customization Engine

### 1. Theming (CSS Variables)
Global variables are located in `index.css`, while themes are in `src/themes/*.css`. To create a new theme:
1. Create `new-theme.css`.
2. Define the palette:
```css
[data-theme="new-theme"] {
  --primary: #your-color;
  --primary-rgb: x, y, z;
  --app-bg: #...;
  /* ... copy other variables from blue.css */
}
```

### 2. Validation Logic
Validation rules are centralized in each component for easy editing. To add a custom rule:
1. Open the form component (e.g., `RegisterForm.jsx`).
2. Update the `validate` function:
```javascript
const validate = (form) => {
    const err = {};
    if (form.password.length < 12) {
        err.password = 'Security policy: Password must be 12+ chars.';
    }
    return err;
};
```

---

## 📁 Project Architecture
```text
src/
├── components/       # Visual components & Icons
│   ├── Icons.jsx     # Centralized SVG registry
│   └── ...Form.jsx   # Standalone form components
├── themes/           # CSS Theme definitions
├── utils/            # Logic & Helper functions
│   ├── cn.js         # Conditional class utility
│   └── form-utils.js # Custom useForm hook
├── App.jsx           # Demo implementation shell
└── index.css         # Base design system & micro-interactions
```

---

## 📦 Production Readiness
Built for scale and performance:
- **Optimization**: Run `npm run build` for a highly minified, chunk-split distribution.
- **Fast Refresh**: Instant feedback during development via Vite.
- **Micro-Scale Icons**: All icons are lightweight inline SVGs, reducing HTTP requests.

---

## 🤝 Support & License
- **Support**: For bugs or customization requests, please contact the author via ThemeForest.
- **License**: Regular or Extended License applies based on your purchase.

© 2026 ThemeForest Author. All rights reserved.
