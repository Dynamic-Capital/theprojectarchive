export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        text: 'var(--text)',
        background: 'var(--bg)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['"SFT Schrifted Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
