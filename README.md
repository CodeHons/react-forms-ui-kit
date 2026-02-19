# React Authentication & Contact Forms UI Kit

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-Regular-orange)

> **A premium, ThemeForest-ready React UI Kit** featuring 4 polished authentication & contact forms with 6 built-in color themes, smooth animations, full client-side validation, and a stunning live preview demo.

---

## 🚀 Features

| Feature | Details |
|---|---|
| **4 Form Components** | Login, Register, Contact, Forgot Password |
| **6 Color Themes** | Blue, Green, Purple, Red, Orange, Dark |
| **Live Theme Switcher** | Click colored dots, changes instantly |
| **Client-Side Validation** | Inline error messages on every field |
| **Password Strength Meter** | Live bar in Register form |
| **Show/Hide Password** | Toggle in Login & Register |
| **Loading States** | Spinner animation on submit |
| **Success Screens** | Animated confirmation after each form submission |
| **Responsive** | Mobile-first, works on all screen sizes |
| **Zero Dependencies** | Plain React + Vite + vanilla CSS |
| **Beginner Friendly** | Clean, commented code — easy to customize |

---

## 📁 Project Structure

```
react-forms-ui-kit/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx          ← Sign in form
│   │   ├── RegisterForm.jsx       ← Sign up form
│   │   ├── ContactForm.jsx        ← Contact / message form
│   │   ├── ForgotPasswordForm.jsx ← Password reset form
│   ├── themes/
│   │   ├── blue.css     ← 🔵 Blue theme variables
│   │   ├── green.css    ← 🟢 Green theme variables
│   │   ├── purple.css   ← 🟣 Purple theme variables
│   │   ├── red.css      ← 🔴 Red theme variables
│   │   ├── orange.css   ← 🟠 Orange theme variables
│   │   └── dark.css     ← ⚫ Dark theme variables
│   ├── App.jsx          ← Demo shell: tabs + theme switcher
│   ├── main.jsx         ← App entry point
│   └── index.css        ← Base styles & shared components
├── public/
├── README.md
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

```bash
# 1. Navigate to the project folder
cd react-forms-ui-kit

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

---

## 🎨 How to Change Colors / Themes

### Option 1 — In the Demo (easiest)
Click any colored dot in the top-right of the header.  
The entire UI updates instantly — no page reload.

### Option 2 — Programmatically via React prop (App.jsx)

Change the default theme by updating the initial state in `App.jsx`:

```jsx
// App.jsx
const [activeTheme, setActiveTheme] = useState('purple'); // ← change here
```

Available values: `'blue'` | `'green'` | `'purple'` | `'red'` | `'orange'` | `'dark'`

### Option 3 — Set at HTML level

The theme is applied via `data-theme` on the `<html>` element:

```html
<html data-theme="dark">
```

You can set this in `index.html` for a fixed theme, or change it in JS:

```js
document.documentElement.setAttribute('data-theme', 'green');
```

### Option 4 — Wrap individual forms

To theme a specific form differently from the rest of the page:

```jsx
<div data-theme="purple">
  <LoginForm />
</div>
```

---

## 📦 Using the Form Components

All forms are self-contained. Drop them anywhere in your React project.

### LoginForm

```jsx
import LoginForm from './components/LoginForm';

// Basic usage
<LoginForm />

// With "Forgot password?" callback
<LoginForm onForgot={() => navigate('/forgot-password')} />
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onForgot` | `function` | Called when user clicks "Forgot password?" |

---

### RegisterForm

```jsx
import RegisterForm from './components/RegisterForm';

<RegisterForm />
```

No required props. The form includes a live password strength indicator.

---

### ContactForm

```jsx
import ContactForm from './components/ContactForm';

<ContactForm />
```

No required props. Features a 500-character message counter.

---

### ForgotPasswordForm

```jsx
import ForgotPasswordForm from './components/ForgotPasswordForm';

// With back-navigation callback
<ForgotPasswordForm onBack={() => navigate('/login')} />
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onBack` | `function` | Called when user clicks "Back to sign in" |

---

## 🛠 Customizing a Theme

Each theme lives in its own CSS file and uses only CSS custom properties. To change the blue theme's primary color:

```css
/* src/themes/blue.css */
[data-theme="blue"] {
  --primary:      #3b82f6;  /* ← Change this to any hex color */
  --primary-dark: #1d4ed8;  /* ← Darker variant for gradients */
  --primary-rgb:  59, 130, 246; /* ← Same color as RGB (for shadows) */
  /* ... */
}
```

### Adding a Brand-New Theme

1. Create `src/themes/mybrand.css`
2. Copy any existing theme file and replace the color values
3. Import it in `App.jsx`:
   ```js
   import './themes/mybrand.css';
   ```
4. Add it to the `THEMES` array in `App.jsx`:
   ```js
   const THEMES = ['blue', 'green', ..., 'mybrand'];
   ```
5. Add its dot color in `index.css`:
   ```css
   .theme-dot[data-theme="mybrand"] { background: #yourcolor; }
   ```

---

## 🔗 Integrating with a Real Backend

The forms use `setTimeout` to simulate async submissions. Replace with real API calls:

```jsx
// LoginForm.jsx — replace the setTimeout block with:
const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate(form.email, form.password);
  if (Object.keys(errs).length) { setErrors(errs); return; }

  setLoading(true);
  try {
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    setSuccess(true);
  } catch (err) {
    setErrors({ email: 'Login failed. Please try again.' });
  } finally {
    setLoading(false);
  }
};
```

---

## 💻 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React      | 19      | UI components |
| Vite       | 7       | Build tool & dev server |
| Vanilla CSS| —       | Styling & themes |
| Inter      | Google Fonts | Typography |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| ≥ 521px   | Full card layout |
| ≤ 520px   | Compact padding, smaller text |

---

## 🧑‍💻 Code Overview

### CSS Custom Properties (CSS Variables)

All theme colors are driven by CSS custom properties. The root variables are:

```css
--primary        /* Main brand color */
--primary-dark   /* Darker gradient stop */
--primary-rgb    /* RGB triplet for rgba() shadows */
--app-bg         /* Page background */
--card-bg        /* Form card background */
--input-bg       /* Input field background */
--text-primary   /* Main text color */
--text-secondary /* Muted text color */
```

---

## 📄 License

**Regular License** — For one end product (personal or commercial).  
**Extended License** — For use in SaaS or products sold to multiple clients.

---

## 🙏 Credits

- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts  
- **Icons:** Inline SVG (Lucide-inspired, no external dependency)

---

*Made with ❤️ for ThemeForest by the author. If you enjoy this product, please leave a ⭐ review!*
