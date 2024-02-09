'use client';

import React from 'react';
import { Filters, ProductCard, SortParams } from '@/service/api/CatalogService';
import getPageProducts from '../utils/pageProducts';
import CatalogCard from './catalogCard';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginationBtn from './paginationBtn';
import Loader from './loader';

export default function Pagination({
  filters,
  sort,
  productsArr,
  maxProds,
}: {
  filters: Filters;
  sort: SortParams | '';
  productsArr: ProductCard[];
  maxProds: number;
}) {
  const maxPage = Math.ceil(maxProds / 12) - 1;
  const query = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [pageProducts, setPageProducts] = React.useState(productsArr);
  useEffect(() => {
    setPage(0);
    const updatePage = async () => {
      const newPageProducts = await getPageProducts({ page: 0, filters, sort });
      setPageProducts(newPageProducts);
      setIsLoading(false);
    };
    updatePage();
  }, [query]);
  useEffect(() => {
    const btns = window.document.querySelectorAll('.pagination');
    btns.forEach((btn) => {
      if (btn instanceof HTMLButtonElement) {
        if (btn.textContent === '>' || btn.textContent === '>>') btn.disabled = page === maxPage;
        if (btn.textContent === '<' || btn.textContent === '<<') btn.disabled = page === 0;
      }
    });
  }, [pageProducts]);
  const handleSubmit = (page: number) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      const newPageProducts = await getPageProducts({ page, filters, sort });
      setPageProducts(newPageProducts);
      setIsLoading(false);
    };
  };
  return (
    <>
      {isLoading ? (
        <Loader size={90} />
      ) : (
        <section className="flex flex-col items-center">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-start mx-3">
            {pageProducts.length !== 0 ? (
              pageProducts.map((p) => <CatalogCard key={p.name} product={p} />)
            ) : (
              <p className=" text-xl text-emerald-900">No matching results</p>
            )}
          </div>
          <div className="flex mb-6">
            <PaginationBtn
              submitFunc={handleSubmit(page)}
              clickFunc={() => {
                if (page > 0) setPage(0);
              }}
              img="<<"
            />
            <PaginationBtn
              submitFunc={handleSubmit(page)}
              clickFunc={() => {
                if (page > 0) setPage(page - 1);
              }}
              img="<"
            />
            <span className="flex items-center justify-center text-emerald-900 border-spacing-2 border-2 mx-2 text-xl border-emerald-900 rounded-3xl font-bold w-10 h-10 py-1">
              {page + 1}
            </span>
            <PaginationBtn
              submitFunc={handleSubmit(page)}
              clickFunc={() => {
                if (page < maxPage) setPage(page + 1);
              }}
              img=">"
            />
            <PaginationBtn
              submitFunc={handleSubmit(page)}
              clickFunc={() => {
                if (page < maxPage) setPage(maxPage);
              }}
              img=">>"
            />
          </div>
        </section>
      )}
    </>
  );
}
