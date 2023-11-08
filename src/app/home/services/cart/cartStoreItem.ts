import { StoreItem } from '../../../shared/storeItem';
import { Cart, CartItem } from '../../types/shoppingcart.type';
import { Observable } from 'rxjs';
import { Product } from '../../types/products.type';

export class CartStoreItem extends StoreItem<Cart> {
  constructor() {
    super({
      products: [],
      totalAmount: 0,
      totalProducts: 0,
    });
  }

  get cart$(): Observable<Cart> {
    return this.value$;
  }

  get cart(): Cart {
    return this.value;
  }

  addProductToCart(product: Product) {
    const existingProduct = this.cart.products.find(
      (cartItem) => cartItem.product.id === product.id,
    );
    let newProducts: CartItem[];
    if (!!existingProduct) {
      newProducts = [
        ...this.cart.products,
        {
          product,
          quantity: 1,
          amount: product.price,
        },
      ];
    } else {
      newProducts = this.cart.products.map((cartItem) => {
        if (cartItem.product.id === product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            amount: cartItem.amount + product.price,
          };
        }

        return cartItem;
      });
      console.log('cartItem', this.cart);
    }

    const newTotalAmount = this.cart.totalAmount + product.price;
    const newTotalProducts = this.cart.totalProducts + 1;
    this.setValue({
      products: newProducts,
      totalAmount: newTotalAmount,
      totalProducts: newTotalProducts,
    });
  }

  removeItemFromCart(product: Product) {
    const existingProductIdx = this.cart.products.findIndex(
      (cartItem) => cartItem.product.id === product.id,
    );
    let newProduct: CartItem;
    let newCart: Cart;

    if (existingProductIdx >= 0) {
      const existingProduct = this.cart.products[existingProductIdx];

      if (existingProduct.quantity > 1) {
        newProduct = {
          ...existingProduct,
          amount: existingProduct.amount - 1,
        };
        let newProductsArray = [...this.cart.products];
        newProductsArray.splice(existingProductIdx, 1, newProduct);
        newCart = {
          ...this.cart,
          products: newProductsArray,
          totalAmount: this.cart.totalAmount - existingProduct.product.price,
          totalProducts: this.cart.totalProducts - 1,
        };
      } else {
        newCart = {
          products: this.cart.products.filter(
            (cartItem) => cartItem.product.id !== product.id,
          ),
          totalAmount: this.cart.totalAmount - existingProduct.product.price,
          totalProducts: this.cart.totalProducts - 1,
        };
        this.setValue(newCart);
      }
    }
  }

  updateQuantity(cartItem: CartItem, $event: MouseEvent) {}
}
