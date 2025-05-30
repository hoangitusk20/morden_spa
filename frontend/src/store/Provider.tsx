"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./index";
import { useEffect, useRef, useState } from "react";
import { loadState } from "@/lib/localStorage";
import { Service } from "@/shared/type";
import { setCart } from "./slices/CartSlice";

function Persistor({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydratedOnce = useRef(false);

  useEffect(() => {
    // Chỉ chạy ở client
    const persistedCart = loadState<Service[]>("cart") || [];
    dispatch(setCart(persistedCart));
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated && hasHydratedOnce.current) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    if (!hasHydratedOnce.current) {
      hasHydratedOnce.current = true;
    }
  }, [cartItems, isHydrated]);

  // ✅ Trì hoãn render cho tới khi hydrate xong
  if (!isHydrated) return null;

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
