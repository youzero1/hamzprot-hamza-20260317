import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Skill } from '@/entities/Skill';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Skill);
    const skills = await repo.find({ order: { category: 'ASC', proficiency: 'DESC' } });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
