import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { ProductResponseData } from '../../types';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const file = await fs.readFile(process.cwd() + '/src/app/api/products.json', 'utf8');
  const data = JSON.parse(file) as ProductResponseData;
  const slug = params.slug;

  const product = data.find((x) => x.ID === slug);
  return NextResponse.json(product);
}
