/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Brand
        primary: {
          DEFAULT: "#4F46E5", // Indigo-600
          light: "#6366F1",
          dark: "#4338CA",
        },

        // Backgrounds
        background: {
          DEFAULT: "#F9FAFB", // Light gray background
          dark: "#0F172A", // Dark mode main bg
        },

        // Chat bubbles
        bubble: {
          sent: "#4F46E5", // Sent message
          received: "#E5E7EB", // Received message
          sentDark: "#4338CA",
          receivedDark: "#1E293B",
        },

        // Status colors
        success: "#22C55E", // Online / active
        danger: "#EF4444", // End call
        warning: "#F59E0B",

        // Text
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          darkPrimary: "#F3F4F6",
          darkSecondary: "#9CA3AF",
        },

        // Borders
        border: {
          light: "#E5E7EB",
          dark: "#334155",
        },
      },
    },
  },
  plugins: [],
};
