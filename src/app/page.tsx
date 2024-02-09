import Link from 'next/link';
import { Promocodes } from './promocodes';

export default function Home() {
  return (
    <main className="font-serif flex flex-col items-center w-full">
      <div
        style={{
          backgroundImage: `url("https://static.tildacdn.com/stor3363-3533-4231-b833-663035623631/27288658.jpg")`,
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          overflow: 'hidden',
          backgroundPosition: 'center',
          margin: 'auto',
        }}
        className="lg:h-[800px] sm:h-[600px] h-[400px]"
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
          className="lg:h-[800px] sm:h-[600px] h-[400px]"
        >
          <h1 className="py-10  mx-8 md:text-3xl sm:text-2xl text-xl uppercase font-light text-[#ffffff] opacity-90  text-center">
            Welcome to Ostara Glass Shop!
          </h1>
          <div className="flex w-3/4 justify-between">
            <Link
              href={'/catalog'}
              className="text-white md:text-xl sm:text-lg  hover:opacity-75 hover:cursor-pointer  w-fit py-1 px-5 border-spacing-2 border-2 mb-20 border-white rounded"
            >
              Catalog
            </Link>
            <Link
              href={'/#promo'}
              className="text-white md:text-xl sm:text-lg w-fit py-1 px-5 border-spacing-2 border-2 mb-20 border-white rounded hover:opacity-75 hover:cursor-pointer"
            >
              Promocodes
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-10 my-5">
        <p className=" text-xl text-emerald-900">
          Here you can find home decor items, made by hand in stained glass technique
        </p>
        <p className=" text-lg text-emerald-900">
          <span className="font-bold">Categories on sale:</span>
          <Link href="/catalog/mirrors" className="underline hover:cursor-pointer underline-offset-2">
            Mirrors
          </Link>
          ,
          <Link href="/catalog/flower-moons" className=" hover:cursor-pointer underline underline-offset-2">
            Flower moons
          </Link>
        </p>
        <p className="mb-5 text-lg text-emerald-900">
          <span className=" font-bold">Search suggestions:</span> you may search by plant name (e.g. &quot;
          <Link href="/catalog/search/fern" className="underline hover:cursor-pointer underline-offset-2">
            fern
          </Link>
          &quot; or &quot;
          <Link href="/catalog/search/heather" className="underline hover:cursor-pointer underline-offset-2">
            heather
          </Link>
          &quot;), by shape (e.g. &quot;
          <Link href="/catalog/search/sun" className="underline hover:cursor-pointer underline-offset-2">
            sun
          </Link>
          &quot;, &quot;
          <Link href="/catalog/search/whale" className="underline hover:cursor-pointer underline-offset-2">
            whale
          </Link>
          &quot;, &quot;
          <Link href="/catalog/search/leaves" className="underline hover:cursor-pointer underline-offset-2">
            leaves
          </Link>
          &quot;) or color
        </p>
        <Link
          href="/login"
          className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
        >
          Log in
        </Link>
        <Link
          href="/registration"
          className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg mx-4 my-6"
        >
          Registration
        </Link>
        <Promocodes />
      </div>
    </main>
  );
}
