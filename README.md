# Cinematic 3D Landing Page

Production-ready Next.js 14 project with React Three Fiber, GSAP, and advanced 3D effects.

## Features

✅ **3D Coffee Cup Model** - Procedurally generated with realistic materials  
✅ **Fragmentation System** - Scroll-driven cup assembly/explosion/reassembly  
✅ **GSAP ScrollTrigger** - Smooth timeline animations  
✅ **Cinematic Lighting** - Orange rim light, fill light, dynamic intensity  
✅ **Postprocessing Effects** - Bloom, Depth of Field, Vignette  
✅ **Mouse Parallax** - Interactive camera movement  
✅ **Performance Optimized** - 60fps target, lazy loading  

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Scene.tsx
│   ├── CoffeeModel.tsx
│   └── ScrollAnimations.tsx
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Build for Production

```bash
npm run build
npm start
```
