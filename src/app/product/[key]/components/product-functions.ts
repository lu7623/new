import CatalogService from '@/service/api/CatalogService';

export async function getProductById(id: string) {
  const catalogService = new CatalogService();
  const product = await catalogService.getProductById(id);

  return { product };
}
