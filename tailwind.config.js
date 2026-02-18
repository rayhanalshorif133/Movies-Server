module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
      },
      fontFamily: {
        pacifico: ["var(--font-pacifico)"],
        roboto: ["var(--font-roboto)"],
        oswald: ["var(--font-oswald)"],
      },
    },
  },
}