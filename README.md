# OCR Scanner - React TypeScript + Vite

A modern web application for OCR (Optical Character Recognition) processing built with React, TypeScript, and Vite. Features a sleek black-orange theme and intuitive user interface.

## Features

- 🔐 **Login Page** - Simple authentication interface
- 📊 **Dashboard** - Overview of processing statistics and recent activity
- 📁 **File Upload** - Drag-and-drop interface for uploading documents
- 🎨 **Black-Orange Theme** - Modern dark theme with orange accents
- ⚡ **Fast Development** - Powered by Vite for instant hot-reload
- 🎯 **TypeScript** - Full type safety throughout the application

## Pages

### 1. Login (`/`)
- Clean authentication form
- Demo mode (any credentials work)
- Responsive design

### 2. Dashboard (`/dashboard`)
- Statistics overview
- Recent activity feed
- Quick navigation to upload
- Processing metrics

### 3. Upload File (`/upload`)
- Drag-and-drop file upload
- Support for images (JPG, PNG) and PDFs
- Real-time processing simulation
- Text extraction results display

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mockup-html-cti
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components (Login, Dashboard, UploadFile)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── index.css      # Global styles and Tailwind imports
└── main.tsx       # Application entry point
```

## Design System

### Colors

The application uses a custom black-orange color palette:

- **Primary Orange**: `#f97316` (orange-500)
- **Dark Background**: `#0d1117` (dark-900)
- **Card Background**: `#212529` (dark-800)
- **Text**: White and gray variants

### Components

Pre-built Tailwind component classes:
- `.btn-primary` - Orange primary buttons
- `.btn-secondary` - Dark secondary buttons
- `.card` - Dark themed cards
- `.input-field` - Form inputs with dark theme

## License

This project is licensed under the MIT License.
