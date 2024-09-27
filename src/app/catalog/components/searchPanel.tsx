import Link from 'next/link';
import CategoryLink from './categoryLink';
import SearchForm from './search';
import { CategoryResponseData } from '@/app/api/types';

export default function SearchPanel({ categoriesList }: { categoriesList: CategoryResponseData }) {
  const cats = categoriesList.map((item) => {
    return <CategoryLink item={item} key={item.name} />;
  });
  return (
    <aside className=" w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6  bg-emerald-900 text-white md:pl-6 pl-4 fixed right-0 h-screen -mt-[61px] pt-20 z-0">
      <div className="fixed w-full">
        <h3 className=" sm:text-lg text-base uppercase block">Categories:</h3>
        <Link href="/catalog" className=" sm:text-base text-sm hover:opacity-75 my-1 hover:-translate-y-0.5 leading-6">
          All Products
        </Link>
        <ul>{cats}</ul>
        <SearchForm />
      </div>
    </aside>
  );
}
