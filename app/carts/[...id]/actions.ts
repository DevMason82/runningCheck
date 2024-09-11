"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteCart(cartId) {
  const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
    method: "DELETE",
  });
  const data = await res.json();

  console.log("DELETE VALUE ==>>", data);
  revalidatePath("/carts");
  redirect("/carts");
}

export async function updateCart(prevState, formData: FormData) {
  const { cartId, mason } = prevState;
  console.log("prevState ==>>", cartId, mason);

  const productId = formData.get("id");
  const productQuantity = formData.get("quantity");

  if (!productId) {
    return { message: "Product ID is missing.", success: false };
  }

  if (isNaN(Number(productId)) || Number(productId) <= 0) {
    return {
      message: "Product ID must be a valid positive number.",
      success: false,
    };
  }

  if (!productQuantity) {
    return { message: "Product quantity is missing.", success: false };
  }

  if (isNaN(Number(productQuantity)) || Number(productQuantity) <= 0) {
    return {
      message: "Product quantity must be a valid positive number.",
      success: false,
    };
  }

  try {
    const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: Number(productId),
            quantity: Number(productQuantity),
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { message: "Update error!", success: false };
    }

    revalidatePath(`/carts/${cartId}`);

    console.log("PUT VALUE ==>>", data);
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  redirect(`/carts/${cartId}`);
}
