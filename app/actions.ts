"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCart() {
  try {
    // Fetch cart data from the external API
    const res = await fetch(`https://dummyjson.com/carts`, {
      // cache: "no-store", // Ensures no caching, gets fresh data each time
    });

    // Handle non-2xx response
    if (!res.ok) {
      throw new Error(`Error fetching cart data `);
    }

    const data = await res.json();

    console.log("Cart Data:", data);

    // Revalidate the cache for the `/carts` path after fetching
    revalidatePath("/carts");

    return data;
  } catch (error) {
    console.error(`Failed to fetch cart data`, error);
    // Optionally, you can handle redirects or specific error responses
    redirect("/error-page"); // Redirect to an error page or show an error message
  }
}
