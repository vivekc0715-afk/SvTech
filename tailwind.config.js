/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/*.{html,js}",
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Core brand confidence and technical authority
        primary: {
          DEFAULT: "#2E2ECF", // blue-700
          50: "#EDEDFC", // blue-50
          100: "#DCDCFA", // blue-100
          200: "#B9B9F5", // blue-200
          300: "#9696F0", // blue-300
          400: "#6262E2", // blue-400
          500: "#2E2ECF", // blue-500
          600: "#2525A6", // blue-600
          700: "#1C1C7D", // blue-700
          800: "#131354", // blue-800
          900: "#0A0A2B", // blue-900
        },
        // Secondary Colors - Premium depth and sophisticated contrast
        secondary: {
          DEFAULT: "#10102e", // slate-900
          50: "#F8F8FA", // slate-50
          100: "#E8E8EE", // slate-100
          200: "#D1D1DD", // slate-200
          300: "#A3A3BB", // slate-300
          400: "#757599", // slate-400
          500: "#474777", // slate-500
          600: "#323255", // slate-600
          700: "#1D1D44", // slate-700
          800: "#10102e", // slate-800
          900: "#080817", // slate-900
        },
        // Accent Colors - AI innovation highlights and interactive focus
        accent: {
          DEFAULT: "#8686f9", // purple-400
          50: "#F5F5FE", // purple-50
          100: "#EBEBFD", // purple-100
          200: "#D7D7FB", // purple-200
          300: "#C3C3FA", // purple-300
          400: "#8686f9", // purple-400
          500: "#5C5CF7", // purple-500
          600: "#3232F5", // purple-600
          700: "#1A1AD3", // purple-700
          800: "#1414A0", // purple-800
          900: "#0E0E6D", // purple-900
        },
        // Background Colors - Clean canvas for extended reading
        background: "#FAFBFC", // gray-50
        surface: "#F4F6F8", // gray-100
        // Text Colors
        "text-primary": "#1A1D29", // slate-900
        "text-secondary": "#64748B", // slate-500
        // Status Colors
        success: {
          DEFAULT: "#059669", // emerald-600
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
          700: "#047857", // emerald-700
        },
        warning: {
          DEFAULT: "#D97706", // amber-600
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
          500: "#F59E0B", // amber-500
          600: "#D97706", // amber-600
          700: "#B45309", // amber-700
        },
        error: {
          DEFAULT: "#DC2626", // red-600
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
          500: "#EF4444", // red-500
          600: "#DC2626", // red-600
          700: "#B91C1C", // red-700
        },
        // Border Colors
        border: "#E2E8F0", // slate-200
        "border-light": "#F1F5F9", // slate-100
      },
      fontFamily: {
        headline: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '600ms',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 600ms ease-out',
        'slide-up': 'slideUp 600ms ease-out',
        'fade-in-up': 'fadeInUp 600ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}