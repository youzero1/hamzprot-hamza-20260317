'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="gradient-text font-bold text-2xl mb-3">AJ</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Developer crafting exceptional digital experiences.
              Available for freelance and full-time opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Find Me Online</h4>
            <div className="space-y-2">
              {[
                { name: 'GitHub', href: 'https://github.com', handle: '@alexjohnson' },
                { name: 'LinkedIn', href: 'https://linkedin.com', handle: '/in/alexjohnson' },
                { name: 'Twitter', href: 'https://twitter.com', handle: '@alexjohnsondev' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm group"
                >
                  <span className="text-blue-500 group-hover:text-blue-400">{s.name}</span>
                  <span className="text-gray-600">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Alex Johnson. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
