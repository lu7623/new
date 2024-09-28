import { PropsWithChildren } from 'react';
import SearchPanel from './components/searchPanel';
import CatalogService from '@/service/api/CatalogService';

export default async function Layout({ children }: PropsWithChildren) {
  const catalogService = new CatalogService();
  const categoriesArr = await catalogService.getCategoriesArr();
  const categoriesList = categoriesArr.filter((cat) => !cat.parent);
  return (
    <div className="flex font-serif">
      <section className="flex flex-col items-center  w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
        <h1 className="text-2xl font-bold text-emerald-900 text-center uppercase my-6">Catalog Page</h1>
        {children}
      </section>
      <SearchPanel categoriesList={categoriesList} />
    </div>
  );
}
