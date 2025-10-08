"use client";

import { atom } from "jotai";
import { io, Socket } from "socket.io-client";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductsTable from "./components/ProductsTable";
import Search from "./components/Search";

const socketInstance = io(process.env.NEXT_PUBLIC_API_URL);
export const socketAtom = atom<Socket>(socketInstance);

export default function App() {

  return (
    <>
      <div className="flex flex-col gap-8 font-sans min-h-screen min-w-screen px-40 py-12 absolute z-10">
        <Header />
        <Search />
        <ProductsTable />
      </div>
      <ProductForm />
    </>
  );
}
