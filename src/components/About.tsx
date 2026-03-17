'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Open Source Contributions', value: '100+' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-dark-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="animate-on-scroll text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Who I Am</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: image & stats */}
          <div className="animate-on-scroll">
            <div className="relative mb-8">
              <div className="aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-9xl mb-4">🧑‍💻</div>
                  <p className="text-gray-400 text-sm">Building the future,<br />one commit at a time</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-dark-700 border border-gray-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div className="animate-on-scroll space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Full Stack Developer & Problem Solver
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I&apos;m a passionate full-stack developer with over 5 years of experience
                building modern web applications. I specialize in React, Next.js, Node.js,
                and cloud infrastructure, with a strong focus on performance and user experience.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                My journey started with a Computer Science degree from MIT, where I
                discovered my love for creating software that makes a real difference.
                Since then, I&apos;ve worked with startups and enterprises alike, delivering
                solutions that scale.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me contributing to open-source projects,
                writing tech articles, or exploring the latest advancements in AI and
                machine learning.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Problem Solving', 'Team Leadership', 'System Design', 'Agile/Scrum'].map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="/resume.pdf"
                download
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <a href="#contact" className="btn-secondary flex items-center gap-2">
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
