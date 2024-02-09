import CatalogService, { Filters, SortParams } from '@/service/api/CatalogService';
import { cardsInfo } from '../../utils/cards';
import FiltersApplied from '../../components/filtersApplied';
import FiltersForm from '../../components/filters';
import SortForm from '../../components/sort';
import SearchHighlight from '../../components/searchHighlight';
import CartService from '@/service/api/CartService';

export default async function Page({
  params,
  searchParams,
}: {
  params: { res: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const catalogService = new CatalogService();
  const filters: Filters = {
    color: searchParams.color,
    priceFrom: searchParams.priceFrom ? Number(searchParams.priceFrom) : undefined,
    priceTo: searchParams.priceTo ? Number(searchParams.priceTo) : undefined,
  };
  const sort = searchParams.sortby ? SortParams[searchParams.sortby as keyof typeof SortParams] : '';
  const search = params.res;
  const products = await catalogService.getAllProductsBySearch(filters, sort, search);
  const discountedProd = await catalogService.getDiscoutedProducts();
  const cartService = new CartService();
  const productsInCart = (await cartService.getActiveCart()).lineItems;
  const list = cardsInfo(products, discountedProd, productsInCart);

  return (
    <>
      <div className="searchRes flex w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6 mb-3 justify-between md:mx-10 mx-28 flex-col min-[820px]:flex-row">
        <h3 className=" text-lg font-bold text-emerald-900">Search resuls for: &quot;{decodeURI(params.res)}&quot;</h3>
        <div className="flex flex-col min-[630px]:flex-row max-[630px]:items-end">
          <FiltersForm prods={products} />
          <SortForm />
        </div>
      </div>
      <FiltersApplied />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-start mx-3">
        {products.length !== 0 ? (
          <SearchHighlight res={params.res} list={list} />
        ) : (
          <p className=" text-xl text-emerald-900">No matching results</p>
        )}
      </div>
    </>
  );
}
