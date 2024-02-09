'use client';

import { FaCopy, FaExclamation } from 'react-icons/fa';

function CardPromocode({
  title,
  promocode,
  discount,
  description,
  note,
}: {
  title: string;
  promocode: string;
  discount: string;
  description: string;
  note: string;
}) {
  const copyPromocode = () => {
    navigator.clipboard.writeText(promocode);
  };
  return (
    <>
      <div
        id="promo"
        className="flex flex-col justify-between	p-4 text-center border text-lg text-emerald-900 border-emerald-900 rounded shadow-sm shadow-emerald-700 transition"
      >
        <h2 className="font-bold">{title}</h2>
        <span className="font-bold text-rose-600">{discount}</span>
        <div
          className="flex hover:text-rose-600 justify-center gap-1 cursor-pointer"
          title="copy"
          onClick={copyPromocode}
        >
          <h3 className="hover:text-xl transition">{promocode}</h3>
          <FaCopy style={{ width: '10px' }} />
        </div>
        <p>{description}</p>
        <div className="flex start items-center justify-center gap-1">
          <FaExclamation style={{ color: 'rgb(234 179 8)' }} /> <span className="text-sm text-yellow-500">{note}</span>
        </div>
      </div>
    </>
  );
}

type promocodesItems = {
  title: string;
  promocode: string;
  discount: string;
  description: string;
  note: string;
};

export function Promocodes() {
  const promocodesItems: promocodesItems[] = [
    {
      title: '$30 DISCOUNT',
      promocode: 'GIFT30',
      discount: '30 $ OFF',
      description: 'Get a $30 discount for orders over $200!',
      note: "Active until 31/10/2023. Don't apply any further cart discounts after this promocode.",
    },
    {
      title: 'Welcome BONUS!',
      promocode: 'WELCOME',
      discount: '5% OFF',
      description: 'All new guests who registered in September - an additional discount on everything!',
      note: 'Active until 31/09/2023. Only for new users and can be combined with all promocodes.',
    },
    {
      title: 'Autumn SALE',
      promocode: 'SUNNY',
      discount: '20 % OFF',
      description: 'Extending summer with sunny discounts!',
      note: "Active until 31/09/2023. Don't apply for categories on SALE and will always be calculated first.",
    },
  ];

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Active Promocodes</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 font-serif mb-6">
        {promocodesItems.map((item, index) => (
          <CardPromocode
            key={index}
            title={item.title}
            promocode={item.promocode}
            discount={item.discount}
            description={item.description}
            note={item.note}
          />
        ))}
      </section>
    </>
  );
}
