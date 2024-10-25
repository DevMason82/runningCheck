export function getStorage(key: string): any {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  } else {
    console.warn("localStorage is not available on the server.");
    return null;
  }
}

export function setStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  } else {
    console.warn("localStorage is not available on the server.");
  }
}

export function removeStorage(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  } else {
    console.warn("localStorage is not available on the server.");
  }
}
