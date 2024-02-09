import CartService from '@/service/api/CartService';
import { DrawListItems } from './components/DrawListItems';
import { EmptyCart } from './components/emptyCart';
import ClearCart from './components/clearCart';
import Promocode from './components/promoCodeInput';

export default async function Page() {
  const cartService = new CartService();
  const activeCart = await cartService.getActiveCart();
  const activeCartID = activeCart.id;
  const cartProducts = activeCart.lineItems;
  const promos = activeCart.discountCodes.map((c) => c.discountCode.obj?.code);
  const price =
    activeCart.lineItems.reduce(
      (acc, item) =>
        acc +
        (item.price?.discounted?.value.centAmount
          ? item.price?.discounted?.value.centAmount * item.quantity
          : item.price?.value.centAmount * item.quantity),
      0
    ) / 100;
  const salePrice = activeCart.totalPrice.centAmount / 100;
  return (
    <>
      <section className="mx-3 font-serif text-emerald-900">
        <h2 className="text-center uppercase text-2xl  my-5 font-bold text-emerald-900">Cart</h2>
        {cartProducts.length !== 0 ? (
          <>
            <ClearCart cartId={activeCartID} cartVersion={activeCart.version} />
            <DrawListItems lineItems={cartProducts} />
            <Promocode
              cartID={activeCartID}
              cartVersion={activeCart.version}
              price={price}
              discountPrice={salePrice}
              promos={promos}
            />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  );
}
