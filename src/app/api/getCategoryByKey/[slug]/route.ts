import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { CategoryResponseData } from '../../types';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const file = await fs.readFile(process.cwd() + '/src/app/api/categories.json', 'utf8');
  const data = JSON.parse(file) as CategoryResponseData;
  const slug = params.slug;

  const category = data.find((x) => x.slug === slug);
  return NextResponse.json(category);
}
