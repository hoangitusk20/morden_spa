// store/localStorage.ts

export const loadState = <T>(key: string): T | undefined => {
  try {
    if (typeof window === "undefined") return undefined; // Đảm bảo chỉ chạy ở client

    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;

    return JSON.parse(serializedState) as T;
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn("Failed to save to localStorage", e);
  }
};
