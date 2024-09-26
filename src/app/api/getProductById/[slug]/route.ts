import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

interface productResponse {
  name: string;
  images: string[];
  price: number;
  discountedPrice: number;
  description: string;
  ID: string;
  key?: string;
  category: string;
  slug: string;
  glassColor: string;
  measures: string;
  materials: string;
}
type ResponseData = productResponse[];
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const file = await fs.readFile(process.cwd() + '/src/app/api/products.json', 'utf8');
  const data = JSON.parse(file) as ResponseData;
  const slug = params.slug;

  const product = data.find((x) => x.ID === slug);
  return NextResponse.json(product);
}
