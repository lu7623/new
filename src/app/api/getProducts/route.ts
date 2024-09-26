import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
  const file = await fs.readFile(process.cwd() + '/src/app/api/products.json', 'utf8');
  const data = JSON.parse(file);
  return NextResponse.json(data);
}
