import type { Product } from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
import { findProductById } from "./productData.mts";

function addProductToCart(product: Product) {
  let cart = [];
  try {
    cart = getLocalStorage("so-cart") || [];
  }
  catch{
    console.error("Error in saving to LocalStorage");
  }
  
  if (!Array.isArray(cart)) {
    throw new Error("Cart is not an array");
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e: Event) {
  console.log("Button clicked");
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
