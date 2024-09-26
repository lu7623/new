export interface ProductResponse {
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

export type ProductResponseData = ProductResponse[];

export interface CategoryResponse {
  name: string;
  id: string;
  children?: CategoryResponse[];
  slug: string;
}

export type CategoryResponseData = CategoryResponse[];
