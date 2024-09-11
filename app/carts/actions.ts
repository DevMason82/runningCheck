"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUserCart(userId) {
  try {
    console.log("Fetching cart data for User ID:", userId);

    // Fetch cart data from the external API
    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`, {
      // cache: "no-store", // Ensures no caching, gets fresh data each time
    });

    // Handle non-2xx response
    if (!res.ok) {
      throw new Error(
        `Error fetching cart data for user ${userId}: ${res.statusText}`,
      );
    }

    const data = await res.json();

    console.log("User Cart Data:", data);

    // Revalidate the cache for the `/carts` path after fetching
    revalidatePath("/carts");

    return data;
  } catch (error) {
    console.error(`Failed to fetch cart data for user ${userId}:`, error);
    // Optionally, you can handle redirects or specific error responses
    redirect("/error-page"); // Redirect to an error page or show an error message
  }
}
