export function getStorage(key: string): any {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  } else {
    console.warn("localStorage is not available on the server.");
    return null;
  }
}
