// store/Provider.tsx
"use client";

import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./index";
import { useEffect } from "react";

function Persistor({ children }: { children: React.ReactNode }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Persistor>{children}</Persistor>
    </Provider>
  );
}
