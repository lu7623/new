import CatalogService from '@/service/api/CatalogService';
import { DrawAttributes } from '../../[key]/components/DrawAttributes';
import { ProductNavBar } from '../../[key]/components/ProductNavBar';
import Slider from '../../[key]/components/Slider';
import { getProductById } from '../../[key]/components/product-functions';
import { ButtonAddToCart } from '../../[key]/components/ButtonAddToCart';
import { getActiveCart } from '@/app/basket/utils/cart-actions';
import AddToCartBtn from '@/app/catalog/components/addToCartBtn';
import { LineItem } from '@commercetools/platform-sdk';

export default async function Page({ params }: { params: { ID: string } }) {
  const res = await getProductById(params.ID);
  const product = res?.product;
  const productName = product.name['en-US'];
  const productDesc = product.description ? product.description['en-US'] : 'Not created';
  const masterVarImgs = product.masterVariant.images
    ? product.masterVariant.images.map((item) => item.url)
    : ['https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'];
  const masterVarAttrs = product.masterVariant.attributes;
  const masterVarSKU = product.masterVariant.sku || 'Not created';
  const discount = res?.discount;
  const masterVarPrices = product.masterVariant.prices
    ? product.masterVariant.prices[0].value.centAmount / 100
    : 'Priceless';
  const discountPrice = discount ? discount / 100 : undefined;

  const cart = await getActiveCart();
  const lineItemId: LineItem | undefined = cart?.lineItems.find((p) => p.productId === params.ID);

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
          {masterVarAttrs && <DrawAttributes attrArr={masterVarAttrs} />}
          <p className="my-2">
            <span className=" font-bold text-emerald-800">SKU:</span> {masterVarSKU}
          </p>
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
          {lineItemId ? (
            <AddToCartBtn inCart={lineItemId.quantity} itemId={product.id} />
          ) : (
            <ButtonAddToCart productID={product.id} />
          )}
        </div>
      </section>
      <ProductNavBar />
    </>
  );
}
