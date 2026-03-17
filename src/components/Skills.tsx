'use client';

import { useEffect, useState, useRef } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

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

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (e) {
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Frontend', 'Backend', 'Tools'];
  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const categoryColors: Record<string, string> = {
    Frontend: 'from-blue-500 to-cyan-500',
    Backend: 'from-violet-500 to-purple-500',
    Tools: 'from-emerald-500 to-teal-500',
  };

  const categoryIcons: Record<string, string> = {
    Frontend: '🎨',
    Backend: '⚙️',
    Tools: '🛠️',
  };

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="animate-on-scroll text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">What I Know</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains.
          </p>
        </div>

        {/* Category tabs */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Loading skills...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No skills found. Try seeding the database.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill) => (
              <div
                key={skill.id}
                className="animate-on-scroll bg-dark-700 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryIcons[skill.category] || '💡'}</span>
                    <span className="text-white font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold gradient-text">{skill.proficiency}%</span>
                </div>

                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category] || 'from-blue-500 to-violet-500'} transition-all duration-1000`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <div className="mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${categoryColors[skill.category] || 'from-blue-500 to-violet-500'} bg-opacity-10 text-gray-400`}
                  >
                    {skill.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
