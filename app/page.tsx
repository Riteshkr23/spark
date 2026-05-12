'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Scene from '@/components/Scene';
import ScrollAnimations from '@/components/ScrollAnimations';

const DynamicScene = dynamic(() => Promise.resolve(Scene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading cinematic experience...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative w-full bg-dark">
      <section className="relative w-full h-screen overflow-hidden">
        <Suspense fallback={<div className="w-full h-screen bg-dark" />}>
          <DynamicScene />
        </Suspense>

        <div
          className="hero-text"
          data-title="hero"
          style={{
            opacity: 1,
            animation: 'fadeBlur 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          }}
        >
          <h1 className="hero-title">Powered by AI</h1>
          <p className="hero-subtitle">Next Generation Product Experience</p>
        </div>

        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          data-subtitle="hero"
          style={{
            opacity: 1,
            animation: 'slideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.3s both',
          }}
        >
          <p className="text-gray-400 text-sm tracking-widest">SCROLL TO EXPLORE</p>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto mt-4 flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      <ScrollAnimations />

      <section className="section">
        <div className="w-full">
          <h2 className="section-title">It's <span className="accent">Wearable</span></h2>
          <div className="grid">
            {[
              {
                title: 'Intelligent Design',
                text: 'Crafted with precision and powered by cutting-edge AI technology for seamless integration into your daily life.',
              },
              {
                title: 'Real-time Processing',
                text: 'Experience instant responsiveness with our advanced neural processing engine optimized for performance.',
              },
              {
                title: 'Adaptive Learning',
                text: 'The more you use it, the smarter it becomes. AI learns your preferences and adapts automatically.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="w-full">
          <h2 className="section-title"><span className="accent">Premium</span> Features</h2>
          <div className="grid">
            {[
              {
                title: '8K Visuals',
                text: 'Crystal-clear display with stunning color accuracy and ultra-high refresh rates.',
              },
              {
                title: 'All-Day Battery',
                text: 'Engineered to keep up with your lifestyle with extended battery life.',
              },
              {
                title: 'Noise Cancellation',
                text: 'Industry-leading active noise cancellation for immersive audio experience.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="text-center w-full max-w-2xl mx-auto">
          <h2 className="section-title mb-8">Ready to Experience the Future?</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Join thousands of users who have already transformed their digital experience with our revolutionary AI-powered platform.
          </p>
          <button className="cta-button mb-6">Get Started Now</button>
          <p className="text-gray-500 text-sm">Available on all major platforms • No credit card required</p>
        </div>
      </section>

      <footer className="bg-black/50 border-t border-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Cinematic Experience. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
