"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getCart() {
  try {
    const res = await fetch(`https://dummyjson.com/carts`, {});

    if (!res.ok) {
      throw new Error(`Error fetching cart data `);
    }

    const data = await res.json();

    // console.log("Cart Data:", data);

    revalidatePath("/carts");

    return data;
  } catch (error) {
    console.error(`Failed to fetch cart data`, error);

    redirect("/error-page");
  }
}

export async function getUserCart(userId) {
  try {
    console.log("Fetching cart data for User ID:", userId);

    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`, {});

    if (!res.ok) {
      throw new Error(
        `Error fetching cart data for user ${userId}: ${res.statusText}`,
      );
    }

    const data = await res.json();

    console.log("User Cart Data:", data);

    revalidatePath("/carts");

    return data;
  } catch (error) {
    console.error(`Failed to fetch cart data for user ${userId}:`, error);

    redirect("/error-page");
  }
}
