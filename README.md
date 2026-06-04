# QuickQR

A modern and lightweight QR Code Generator built with React, Vite, and Tailwind CSS.

QuickQR allows users to instantly generate QR codes from text and URLs through a clean, responsive, dark-themed interface. The application focuses on simplicity, speed, and usability while providing real-time QR preview, customization options, fullscreen viewing, and PNG downloads.

## Live Demo

https://quick-qr-psi.vercel.app/

---

## Features

### Text to QR

Generate QR codes from plain text instantly.

### URL to QR

Convert website links into scannable QR codes.

### Real-Time Preview

QR codes update automatically while editing content.

### QR Customization

* Custom QR Color
* Custom Background Color
* Multiple Resolution Options

  * 256px
  * 512px
  * 768px
  * 1024px

### Download QR

Export generated QR codes as PNG images.

### Fullscreen Preview

View generated QR codes in a larger preview mode.

### Responsive Design

Optimized for:

* Desktop
* Tablet
* Mobile Devices

### Modern UI

* Dark Theme
* Glassmorphism Effects
* Smooth Animations
* Clean User Experience

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Libraries

* QRCode
* Framer Motion
* Lucide React

### Deployment

* Vercel

---

## Project Structure

```bash
src/
│
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── QRGenerator.tsx
│   └── Footer.tsx
│
├── lib/
│   └── qr.ts
│
├── utils/
│   └── helpers.ts
│
├── App.tsx
└── main.tsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project folder:

```bash
cd quickqr
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Usage

### Generate a Text QR

1. Open QuickQR
2. Select the Text tab
3. Enter any text
4. QR code is generated automatically
5. Download as PNG

### Generate a URL QR

1. Select the URL tab
2. Enter a valid URL
3. QR code is generated automatically
4. Download as PNG

---

## Highlights

* Fast QR generation
* Clean dark-themed UI
* Responsive design
* Real-time updates
* Easy customization
* Lightweight and efficient

---

## Future Improvements

* SVG Download Support
* QR Logo Embedding
* QR History
* Batch QR Generation
* Custom QR Shapes
* Advanced Styling Options

---



