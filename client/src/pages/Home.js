import React, { useEffect } from "react";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_PRODUCTS } from '../utils/actions'
import { useQuery } from "@apollo/client";
import UserHome from "./user/Userhome";
import AdminHome from "./admin/adminHome";

export default function Home() {
  const { data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  return <div>{user.admin ? <AdminHome /> : <UserHome />}</div>;
}
