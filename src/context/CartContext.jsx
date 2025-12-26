import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState(null);

  /* Persist cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ADD TO CART IMAGE*/
  const addToCart = (product, quantity = 1) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || null,
      brand: product.brand || "",
      category: product.category || "",
      quantity,
    };

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, cartProduct];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const buyNow = (product, quantity = 1) => {
    setCheckoutItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || null,
      quantity,
    });
  };

  const clearCheckoutItem = () => setCheckoutItem(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        buyNow,
        checkoutItem,
        clearCheckoutItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
