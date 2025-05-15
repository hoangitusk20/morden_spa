// store/localStorage.ts

export const loadState = <T>(key: string): T | undefined => {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) return undefined;
      return JSON.parse(serializedState) as T;
    } catch (e) {
      console.warn('Failed to load from localStorage', e);
      return undefined;
    }
  };
  
  export const saveState = <T>(key: string, state: T) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };
  