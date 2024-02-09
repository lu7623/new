import { SessionDataStorage } from '@/controller/session/server';
import { ApiService } from '@/service/api/ApiService';
import { Cart } from '@commercetools/platform-sdk';

export default class CartService extends ApiService {
  public async getActiveCart() {
    try {
      const response = await this.apiRoot
        .me()
        .activeCart()
        .get({
          queryArgs: {
            expand: ['discountCodes[*].discountCode.obj.code'],
          },
        })
        .execute();
      this.updateCartProdsQty(response.body);
      return response.body;
    } catch (err) {
      const response = await this.createCart();
      this.updateCartProdsQty(response);
      return response;
    }
  }

  public async getAllCarts() {
    const response = await this.apiRoot.me().carts().get().execute();
    return response.body;
  }

  public async addProductToCart(productId: string, qty: number) {
    const activeCart = await this.getActiveCart();
    const activeCartID: string = activeCart.id;
    const activeCartVersion = activeCart.version;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity: qty,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
  }

  public async removeProductFromCart(lineItemId: string, qty: number) {
    const activeCart = await this.getActiveCart();
    const activeCartID: string = activeCart.id;
    const activeCartVersion = activeCart.version;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
              quantity: qty,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
    return req.body;
  }

  public cartProdsQty() {
    const session = new SessionDataStorage().getData();
    return session.qty;
  }

  public updateCartProdsQty(cart: Cart) {
    const storage = new SessionDataStorage();
    const session = storage.getData();
    session.qty = cart.totalLineItemQuantity;
    storage.save(session);
  }

  public async createCart() {
    const cartDraft = {
      currency: 'USD',
    };
    const result = await this.apiRoot.me().carts().post({ body: cartDraft }).execute();
    return result.body;
  }

  public async deleteCart(cartID: string, cartVersion: number) {
    const result = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: cartID })
      .delete({ queryArgs: { version: cartVersion } })
      .execute();
    return result.body;
  }

  public async addPromocode(cartID: string, cartVersion: number, promocode: string) {
    const result = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'addDiscountCode',
              code: promocode,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(result.body);
    return result.body;
  }

  public async deletePromocode(cartID: string, cartVersion: number, promocodeID: string) {
    const result = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: promocodeID,
              },
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(result.body);
    return result.body;
  }
}
