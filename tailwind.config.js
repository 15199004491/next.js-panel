/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(0.9792 0.0029 264.5421)',
        foreground: 'oklch(0.1448 0 0)',
        card: 'oklch(1.0000 0 0)',
        'card-foreground': 'oklch(0.1448 0 0)',
        popover: 'oklch(1.0000 0 0)',
        'popover-foreground': 'oklch(0.1448 0 0)',
        primary: 'oklch(0.4622 0.2860 264.2491)',
        'primary-foreground': 'oklch(1.0000 0 0)',
        secondary: 'oklch(0.9698 0.0069 247.8956)',
        'secondary-foreground': 'oklch(0.1448 0 0)',
        muted: 'oklch(0.9698 0.0069 247.8956)',
        'muted-foreground': 'oklch(0.5544 0.0407 257.4166)',
        accent: 'oklch(0.9698 0.0069 247.8956)',
        'accent-foreground': 'oklch(0.1448 0 0)',
        destructive: 'oklch(0.6368 0.2078 25.3313)',
        'destructive-foreground': 'oklch(1.0000 0 0)',
        border: 'oklch(0.9288 0.0126 255.5078)',
        input: 'oklch(0.9288 0.0126 255.5078)',
        ring: 'oklch(0.4745 0.2980 264.2011)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}