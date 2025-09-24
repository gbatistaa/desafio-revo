"use client";

import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductsTable from "./components/ProductsTable";
import Search from "./components/Search";

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
