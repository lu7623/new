import { DrawAttributes } from './components/DrawAttributes';
import { ProductNavBar } from './components/ProductNavBar';
import Slider from './components/Slider';
import { getProductById } from './components/product-functions';
import AddToCartBtn from '@/app/catalog/components/addToCartBtn';
import CartService from '@/service/api/CartService';

export default async function Page({ params }: { params: { key: string } }) {
  const res = await getProductById(params.key);
  const product = res?.product;
  if (!product) return <div>Getting product fails</div>;
  const productName = product.name;
  const productDesc = product.description ? product.description : 'Not created';
  const masterVarImgs = product.images ? product.images : ['/no-image.png'];

  const discount = product.discountedPrice;
  const masterVarPrices = product.price ? product.price / 100 : 'Priceless';
  const discountPrice = discount ? discount / 100 : undefined;

  const cart = new CartService().getActiveCart();
  const lineItemKey = (await cart).lineItems?.find((p) => p.productKey === params.key);

  return (
    <>
      <h2 className="text-center uppercase md:text-2xl text-xl font-serif my-5 font-bold text-emerald-900">
        {productName}
      </h2>
      <section className="flex flex-col md:flex-row gap-4 justify-center items-center font-serif text-lg">
        <Slider urlArr={masterVarImgs} />
        <div className=" md:w-96 mx-6">
          <p className=" font-bold text-emerald-800 ">Description:</p>
          <p className="mb-2">{productDesc}</p>
          <DrawAttributes product={product} />
          {discountPrice ? (
            <p className=" mt-2">
              <span className=" font-bold text-emerald-800">Price: </span>
              <span className="font-bold text-red-800">{discountPrice.toFixed(2)} USD</span>
              <span className="font-bold text-emerald-900 ml-2 line-through">{masterVarPrices} USD</span>
            </p>
          ) : (
            <p className="mt-2 font-bold text-emerald-900 ">
              <span className=" font-bold text-emerald-800">Price:</span> {masterVarPrices}$
            </p>
          )}
          <AddToCartBtn inCart={lineItemKey ? lineItemKey.quantity : 0} itemId={product.ID} />
        </div>
      </section>
      <ProductNavBar />
    </>
  );
}
