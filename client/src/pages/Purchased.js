import React from "react";
import { useStoreContext } from "../contexts/GlobalContext";

export default function Purchased() {
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  return(
    <div className="text-center mx-5 my-5">
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
    </div>
  )
}