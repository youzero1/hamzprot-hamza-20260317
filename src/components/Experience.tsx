'use client';

import { useEffect, useRef } from 'react';

const experiences = [
  {
    id: 1,
    role: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    period: 'Jan 2022 — Present',
    type: 'Full-time',
    description:
      'Led development of microservices architecture serving 2M+ users. Reduced page load times by 40% through performance optimization. Mentored a team of 5 junior developers.',
    technologies: ['Next.js', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: 'Mar 2020 — Dec 2021',
    type: 'Full-time',
    description:
      'Built and shipped 3 major product features from scratch. Integrated third-party APIs (Stripe, Twilio, Google Maps). Implemented CI/CD pipelines reducing deployment time by 60%.',
    technologies: ['React', 'Express', 'MongoDB', 'Redis', 'GCP'],
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Digital Agency Co.',
    period: 'Jun 2019 — Feb 2020',
    type: 'Full-time',
    description:
      'Developed responsive web applications for 15+ clients across various industries. Collaborated closely with design teams to implement pixel-perfect UIs.',
    technologies: ['React', 'Vue.js', 'SCSS', 'TypeScript', 'Webpack'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 4,
    role: 'Junior Web Developer',
    company: 'FreelanceWork',
    period: 'Jan 2018 — May 2019',
    type: 'Freelance',
    description:
      'Designed and developed websites for small businesses and individuals. Gained hands-on experience with modern JavaScript frameworks and backend development.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'WordPress', 'CSS3'],
    color: 'from-orange-500 to-amber-500',
  },
];

export default function Experience() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="animate-on-scroll text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">My Journey</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A timeline of my professional journey and the impact I&apos;ve made along the way.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="animate-on-scroll relative pl-0 md:pl-20"
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-6 w-8 h-8 rounded-full bg-gradient-to-br ${exp.color} hidden md:flex items-center justify-center shadow-lg z-10`}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Card */}
                <div className="bg-dark-700 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-gray-400 text-sm">{exp.period}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${exp.color} text-white font-medium`}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-800 text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
