'use client';

import { useEffect, useState, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  techStack: string;
  featured: boolean;
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchProjects();
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

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  const projectEmojis = ['🚀', '💬', '🤖', '📊', '💰', '🌐', '🔧', '✨'];

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="animate-on-scroll text-center mb-12">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">My Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building
            great products.
          </p>
        </div>

        {/* Filter */}
        <div className="animate-on-scroll flex justify-center gap-3 mb-10">
          {(['all', 'featured'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                filter === f
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500'
              }`}
            >
              {f === 'all' ? 'All Projects' : 'Featured'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No projects found. Try seeding the database.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} emoji={projectEmojis[idx % projectEmojis.length]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, emoji }: { project: Project; emoji: string }) {
  const techs = project.techStack.split(',').map((t) => t.trim());

  return (
    <div className="animate-on-scroll group bg-dark-700 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Project image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900/30 to-violet-900/30 flex items-center justify-center border-b border-gray-800">
        <span className="text-6xl">{emoji}</span>
        {project.featured && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techs.map((tech) => (
            <span
              key={tech}
              className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2 border-t border-gray-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
