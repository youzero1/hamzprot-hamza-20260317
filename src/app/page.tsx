'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  useEffect(() => {
    // Auto-seed on first load
    autoSeed();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const autoSeed = async () => {
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      if (data.seeded) {
        setSeedMessage('Sample data loaded!');
        setSeeded(true);
        setTimeout(() => setSeedMessage(''), 3000);
      }
    } catch (e) {
      // Silent fail on auto-seed
    }
  };

  const handleManualSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      setSeedMessage(data.message || 'Done!');
      setSeeded(true);
      setTimeout(() => setSeedMessage(''), 4000);
    } catch (e) {
      setSeedMessage('Error seeding data');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <main className="bg-dark-900 min-h-screen">
      {/* Seed notification */}
      {seedMessage && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
          {seedMessage}
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="gradient-text font-bold text-xl">AJ</span>
            <div className="hidden md:flex items-center gap-6">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={handleManualSeed}
                disabled={seeding}
                className="text-xs border border-gray-700 text-gray-500 hover:border-blue-500 hover:text-blue-400 px-3 py-1 rounded-md transition-all duration-200"
              >
                {seeding ? 'Seeding...' : 'Seed Data'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <ContactForm />
      <Footer />
    </main>
  );
}
