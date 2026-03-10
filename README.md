# Plex Style Stream UI

A modern, highly-polished web interface inspired by premium streaming platforms like Plex. This project showcases a beautiful grid-based UI, complete with dynamic hero sections, horizontal scrolling movie rows, and immersive modal interactions.

## 🌟 Features

*   **Dynamic Hero Banner**: Automatically features a random movie or show from the dataset, complete with a high-resolution backdrop and rich typography.
*   **Glassmorphic Navigation**: A sleek, sticky top navigation bar with a frosted glass effect that adapts as you scroll.
*   **Horizontal Movie Sliders**: Smoothly scrollable rows of movie cards, featuring aspect-ratio-locked posters and hover-triggered metadata overlays.
*   **Immersive Detail Modals**: Clicking any movie card reveals a beautifully animated modal overlay with full movie details, ratings, and actionable buttons.
*   **Modern Aesthetics**: Built with a dark, premium color palette, subtle gradients, and smooth micro-interactions.
*   **Responsive Design**: Adapts gracefully from large desktop monitors down to mobile screens.

## 🛠️ Technology Stack

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom variables, flexbox layouts, CSS animations, and backdrop-filters (No external CSS frameworks used).
*   **JavaScript (ES6+)**: Vanilla JS for DOM manipulation, API fetching, and interactive components.
*   **Lucide Icons**: Beautiful, lightweight SVG icons.
*   **Google Fonts**: Uses the 'Inter' typeface for clean, modern legibility.

## 🚀 Getting Started

To view the project locally, you can simply open the `index.html` file in your browser, or for a better experience, serve it using a local HTTP server.

### Prerequisites

You'll need Node.js or Python installed to run a simple local server.

### Running the App

**Option 1: Using npx (Node.js)**
```bash
npx serve .
```

**Option 2: Using Python**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then navigate to `http://localhost:3000` in your web browser.

## 📡 API Integration

This project uses the [JSON Fakery API](https://jsonfakery.com/) (`https://jsonfakery.com/movies/paginated?page=1`) to fetch mock movie data, demonstrating how the UI components handle real JSON payloads, loading states, and missing data fallbacks.

## 🎨 Design Decisions

*   **Typography**: 'Inter' was chosen for its excellent readability and modern, geometric feel that suits streaming interfaces.
*   **Color Palette**: A dark theme (approx. `#0f1115`) reduces eye strain for media apps, accented with a vibrant amber (`#E5A00D`) to draw attention to interactive elements (ratings, buttons) without being overwhelming.
*   **Animations**: Transitions run at `0.3s` to `0.4s` to feel deliberate and premium, avoiding overly snappy or sluggish movements.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
