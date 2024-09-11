import React, { useEffect, useState } from "react";
import { getUserCart } from "@/app/carts/actions";

const UserIdCartInfo = async () => {
  const data = await getUserCart(33);

  return <div>{JSON.stringify(data)}</div>;
};

export default UserIdCartInfo;
