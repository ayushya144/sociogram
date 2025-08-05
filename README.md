# 📸 Sociogram

A modern, Instagram-like social media feed built with React, Next.js, and TypeScript. Features a responsive design with smooth animations, real-time interactions, and a polished mobile-first user experience.

![Sociogram Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-38B2AC)

## ✨ Features

### 🎯 Core Functionality

- **📱 Responsive Feed**: Mobile-first design that works perfectly on all devices
- **❤️ Like System**: Real-time like/unlike functionality with visual feedback
- **💬 Comment System**: Instagram-style bottom drawer for comments
- **🔄 State Management**: Centralized state with custom hooks and localStorage persistence
- **🌙 Dark Mode**: Toggle between light and dark themes with system preference detection

### 🎨 UI/UX Features

- **📱 Mobile-Optimized**: Perfect keyboard handling and viewport management
- **🎭 Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **🖼️ Image Optimization**: Next.js Image component for optimal loading

### 🔧 Technical Features

- **📊 TypeScript**: Full type safety across the application
- **🎨 Tailwind CSS**: Utility-first styling with custom design system
- **💾 Data Persistence**: localStorage for likes and comments
- **🔄 Real-time Updates**: Instant UI updates without page refresh

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sociogram.git
   cd sociogram
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
sociogram/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── modules/               # Feature modules
│   │   └── feed/             # Feed module
│   │       ├── index.tsx     # Main Feed component
│   │       └── components/   # Feed components
│   │           └── post-card/
│   │               ├── index.tsx
│   │               └── components/
│   │                   ├── comment-drawer/
│   │                   └── comment-section/
│   └── utils/                # Utility functions and hooks
│       ├── data/            # Mock data
│       └── hooks/           # Custom hooks
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## 🎮 Usage

### Basic Interactions

1. **View Posts**: Scroll through the feed to see posts with images and captions
2. **Like Posts**: Tap the heart icon to like/unlike posts
3. **View Comments**: Tap the comment icon to open the comment drawer
4. **Add Comments**: Type in the input field and tap "Post" to add comments
5. **Toggle Theme**: Use the theme toggle button in the header
6. **Reset Data**: Use the "Reset" button to restore initial mock data

## 🔧 Configuration

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Dark mode support
- Custom color palette
- Responsive breakpoints
- Animation utilities

### TypeScript Configuration

Strict TypeScript configuration with:

- Strict mode enabled
- Path mapping for clean imports
- ESLint integration
