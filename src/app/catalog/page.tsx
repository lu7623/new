import CatalogService, { Filters, SortParams } from '@/service/api/CatalogService';
import CatalogNavPanel from './components/navPanel';
import FiltersApplied from './components/filtersApplied';
import Pagination from './components/pagination';
import getPageProducts from './utils/pageProducts';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const catalogService = new CatalogService();
  const filters: Filters = {
    color: searchParams.color,
    priceFrom: searchParams.priceFrom ? Number(searchParams.priceFrom) : undefined,
    priceTo: searchParams.priceTo ? Number(searchParams.priceTo) : undefined,
  };
  const sort = searchParams.sortby ? SortParams[searchParams.sortby as keyof typeof SortParams] : '';
  const products = await catalogService.getProductsByFilters(filters, sort);
  const pageProducts = await getPageProducts({ page: 0, filters: filters, sort: sort });
  return (
    <>
      <CatalogNavPanel products={products} />
      <FiltersApplied />
      <Pagination filters={filters} sort={sort} productsArr={pageProducts} maxProds={products.length} />
    </>
  );
}
