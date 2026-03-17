import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Project } from '@/entities/Project';
import { Skill } from '@/entities/Skill';

export async function GET() {
  try {
    const ds = await getDataSource();
    const projectRepo = ds.getRepository(Project);
    const skillRepo = ds.getRepository(Skill);

    const existingProjects = await projectRepo.count();
    const existingSkills = await skillRepo.count();

    if (existingProjects > 0 || existingSkills > 0) {
      return NextResponse.json({ message: 'Database already seeded', seeded: false });
    }

    const projects = projectRepo.create([
      {
        title: 'E-Commerce Platform',
        description:
          'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with modern web technologies for optimal performance.',
        imageUrl: '',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        techStack: 'React,Node.js,PostgreSQL,Stripe,Redux',
        featured: true,
      },
      {
        title: 'Real-Time Chat Application',
        description:
          'A real-time messaging app supporting multiple rooms, private messages, and file sharing. Features WebSocket connections for instant communication.',
        imageUrl: '',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        techStack: 'Next.js,Socket.io,MongoDB,Tailwind CSS',
        featured: true,
      },
      {
        title: 'AI Task Manager',
        description:
          'An intelligent task management app that uses AI to prioritize tasks, suggest deadlines, and automate repetitive workflows. Integrates with popular productivity tools.',
        imageUrl: '',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        techStack: 'React,Python,FastAPI,OpenAI,SQLite',
        featured: true,
      },
      {
        title: 'DevOps Dashboard',
        description:
          'A centralized monitoring dashboard for DevOps teams. Visualizes CI/CD pipelines, server metrics, deployment history, and alerting configurations.',
        imageUrl: '',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        techStack: 'Vue.js,Grafana,Kubernetes,Docker,Go',
        featured: false,
      },
      {
        title: 'Personal Finance Tracker',
        description:
          'A personal finance management app that tracks income, expenses, investments, and provides visual analytics with budget recommendations.',
        imageUrl: '',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        techStack: 'React Native,TypeScript,Firebase,Chart.js',
        featured: false,
      },
    ]);

    await projectRepo.save(projects);

    const skills = skillRepo.create([
      { name: 'React', category: 'Frontend', proficiency: 95 },
      { name: 'Next.js', category: 'Frontend', proficiency: 90 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 88 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92 },
      { name: 'Vue.js', category: 'Frontend', proficiency: 75 },
      { name: 'Node.js', category: 'Backend', proficiency: 90 },
      { name: 'Python', category: 'Backend', proficiency: 82 },
      { name: 'PostgreSQL', category: 'Backend', proficiency: 85 },
      { name: 'MongoDB', category: 'Backend', proficiency: 80 },
      { name: 'GraphQL', category: 'Backend', proficiency: 75 },
      { name: 'Docker', category: 'Tools', proficiency: 85 },
      { name: 'Git', category: 'Tools', proficiency: 95 },
      { name: 'AWS', category: 'Tools', proficiency: 78 },
      { name: 'Linux', category: 'Tools', proficiency: 82 },
      { name: 'Figma', category: 'Tools', proficiency: 70 },
    ]);

    await skillRepo.save(skills);

    return NextResponse.json({
      message: 'Database seeded successfully',
      seeded: true,
      projects: projects.length,
      skills: skills.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
